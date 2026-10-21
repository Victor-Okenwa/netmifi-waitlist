const { queryState } = require('../constants/queryState');
const { query, isUniqueConstraintError } = require('../config/dbConn');
const { sendEmail } = require('../services/emailService');

function normalize(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function mapNewsletter(row) {
    return {
        id: Number(row.id),
        email: row.email,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function duplicateResponse(res) {
    return res.status(409).json({
        message: 'Looks like your email already has a subscription',
        state: queryState.error,
        data: undefined,
    });
}

const newsletter = async (req, res) => {
    const email = normalize(req.body?.email);

    if (!email) {
        return res.status(400).json({
            message: 'Email is required',
            state: queryState.error,
            data: undefined,
        });
    }

    try {
        const existing = await query(
            'SELECT id FROM newsletter WHERE email = ?',
            [email]
        );

        if (existing.rows.length) {
            return duplicateResponse(res);
        }

        let created;
        try {
            created = await query(
                `INSERT INTO newsletter (email) VALUES (?)
                 RETURNING id, email, created_at, updated_at`,
                [email]
            );
        } catch (error) {
            if (isUniqueConstraintError(error)) {
                return duplicateResponse(res);
            }
            throw error;
        }

        res.status(202).json({
            message: 'subscription activated',
            state: queryState.success,
            data: mapNewsletter(created.rows[0]),
        });

        sendEmail(email, 'newsletter_activated').catch((error) => {
            console.error('Failed to send email:', error);
        });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({
                message: error.message,
                state: queryState.error,
                data: undefined,
            });
        }
    }
};

module.exports = { newsletter };
