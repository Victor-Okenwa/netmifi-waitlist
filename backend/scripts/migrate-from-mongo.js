/**
 * One-time copy of waitlist and newsletter documents into Turso.
 *
 * Requires DATABASE_URI plus TURSO_DATABASE_URL (and TURSO_AUTH_TOKEN for libsql://).
 * Install the driver first if it is no longer in node_modules: npm install mongodb
 *
 *   node scripts/migrate-from-mongo.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

let MongoClient;
try {
    ({ MongoClient } = require('mongodb'));
} catch (error) {
    console.error('This copy needs the mongodb package. From the backend directory run: npm install mongodb');
    process.exit(1);
}
const { ensureSchema, query } = require('../src/config/dbConn');

function toIso(value) {
    const date = value instanceof Date ? value : new Date(value || Date.now());
    if (Number.isNaN(date.getTime())) {
        return new Date().toISOString();
    }
    return date.toISOString();
}

function normalize(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

async function databaseFor(client, collectionName) {
    try {
        const { databases } = await client.db().admin().listDatabases();
        for (const { name } of databases) {
            if (name === 'admin' || name === 'local') continue;
            const collections = await client.db(name).listCollections().toArray();
            if (collections.some((collection) => collection.name === collectionName)) {
                return client.db(name);
            }
        }
    } catch (error) {
        console.warn(`Could not list databases (${error.message}). Using the database in DATABASE_URI.`);
    }
    return client.db();
}

async function copyCollection(mongoDb, collectionName, insert) {
    const exists = await mongoDb.listCollections({ name: collectionName }).hasNext();
    if (!exists) {
        console.log(`${collectionName}: collection not found, skipped`);
        return { read: 0, inserted: 0, skipped: 0 };
    }

    const docs = await mongoDb.collection(collectionName).find({}).toArray();
    let inserted = 0;
    let skipped = 0;

    for (const doc of docs) {
        const row = insert(doc);
        if (!row) {
            skipped += 1;
            continue;
        }
        const result = await query(row.sql, row.args);
        inserted += Number(result.rowsAffected);
    }

    console.log(`${collectionName}: read ${docs.length}, inserted ${inserted}, skipped ${skipped}`);
    return { read: docs.length, inserted, skipped };
}

async function main() {
    if (!process.env.DATABASE_URI) {
        throw new Error('DATABASE_URI is not set');
    }
    if (!process.env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL.startsWith('file:')) {
        throw new Error('Set TURSO_DATABASE_URL to a libsql:// URL before copying production signups');
    }

    await ensureSchema();

    const mongo = new MongoClient(process.env.DATABASE_URI);
    await mongo.connect();
    try {
        const waitlistDb = await databaseFor(mongo, 'waitlists');
        const newsletterDb = await databaseFor(mongo, 'newsletters');

        await copyCollection(waitlistDb, 'waitlists', (doc) => {
            const name = normalize(doc.name);
            const email = normalize(doc.email);
            if (!name || !email) return null;
            const createdAt = toIso(doc.createdAt);
            return {
                sql: `INSERT OR IGNORE INTO waitlist (name, email, created_at, updated_at)
                      VALUES (?, ?, ?, ?)`,
                args: [name, email, createdAt, toIso(doc.updatedAt || doc.createdAt)],
            };
        });

        await copyCollection(newsletterDb, 'newsletters', (doc) => {
            const email = normalize(doc.email);
            if (!email) return null;
            const createdAt = toIso(doc.createdAt);
            return {
                sql: `INSERT OR IGNORE INTO newsletter (email, created_at, updated_at)
                      VALUES (?, ?, ?)`,
                args: [email, createdAt, toIso(doc.updatedAt || doc.createdAt)],
            };
        });
    } finally {
        await mongo.close();
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
