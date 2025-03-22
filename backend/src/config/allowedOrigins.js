require('dotenv/config')
const whiteList = [
    'http://localhost:8000', 
    'http://127.0.0.1:8000',
    process.env.FRONTEND_URL
];

module.exports = whiteList;