const { queryState } = require('../constants/queryState');
const { query, isUniqueConstraintError } = require('../config/dbConn');
const { sendEmail } = require('../services/emailService');

function normalize(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function mapWaitlist(row) {
    return {
        id: Number(row.id),
        name: row.name,
        email: row.email,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function duplicateResponse(res) {
    return res.status(409).json({
        message: 'Looks like your email is already on the waitlist',
        state: queryState.blocked,
        data: undefined,
    });
}

const waitlist = async (req, res) => {
    const name = normalize(req.body?.name);
    const email = normalize(req.body?.email);

    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required',
            state: queryState.error,
            data: undefined,
        });
    }

    try {
        const existing = await query(
            'SELECT id FROM waitlist WHERE email = ?',
            [email]
        );

        if (existing.rows.length) {
            return duplicateResponse(res);
        }

        let created;
        try {
            created = await query(
                `INSERT INTO waitlist (name, email) VALUES (?, ?)
                 RETURNING id, name, email, created_at, updated_at`,
                [name, email]
            );
        } catch (error) {
            if (isUniqueConstraintError(error)) {
                return duplicateResponse(res);
            }
            throw error;
        }

        sendEmail(email, 'waitlist_confirmation', name).then(() => {
            console.log('Email sent successfully');
        }).catch((error) => {
            console.error('Failed to send email:', error);
        });

        res.status(201).json({
            message: 'Waitlist registration successful',
            state: queryState.success,
            data: mapWaitlist(created.rows[0]),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
};

const waitlistCount = async (req, res) => {
    try {
        const result = await query('SELECT COUNT(*) AS count FROM waitlist');
        const count = Number(result.rows[0]?.count ?? 0);
        if (!Number.isInteger(count) || count < 0) {
            return res.status(500).json({
                message: 'Could not read the waitlist count',
                state: queryState.error,
                data: undefined,
            });
        }
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
};

module.exports = { waitlist, waitlistCount };
