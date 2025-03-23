require('dotenv/config');

const whiteList = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'https://waitlist-netmifi.vercel.app',
    process.env.FRONTEND_URL.toString()
];

module.exports = whiteList;