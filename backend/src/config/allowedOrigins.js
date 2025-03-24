require('dotenv').config();

const allowedOrigins = [
    'https://netmifi-waitlist.vercel.app',
    'https://waitlist-netmifi.vercel.app',
    'https://*.vercel.app', // Allow all Vercel preview deployments
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    process.env.FRONTEND_URL
];

module.exports = allowedOrigins;