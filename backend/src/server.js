require('module-alias/register');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const servicesRoutes = require('./routes/servicesRoutes');
const waitlistRoutes = require('./routes/waitlistRoutes')
const limiter = require('./middlewares/limiter');
const corsOptions = require('./config/corsOptions');
const { connectToDb } = require('./config/dbConn');
const app = express();
const PORT = process.env.PORT || 3000;
const stageEnv = process.env.NODE_ENV;


// app.use(require('./middlewares/credentials')) 
// 1. CORS First (before any other middleware)
app.options('*', cors({
    origin: true, // Use true instead of * for credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // Required for Vercel
}));

app.use(cors({
    origin: [
        'https://waitlist-netmifi.vercel.app',
        'https://netmifi-waitlist.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
    credentials: true // Only if using cookies/auth
}));

// 2. Security Headers (modified for Vercel)
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             connectSrc: [
//                 "'self'",
//                 'https://waitlist-netmifi.vercel.app',
//                 'https://netmifi-waitlist.vercel.app'
//             ],
//             imgSrc: ["'self'", 'data:'],
//             scriptSrc: ["'self'", "'unsafe-inline'"], // TEMPORARY FOR DEBUGGING
//             objectSrc: ["'none'"],
//             upgradeInsecureRequests: []
//         }
//     },
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//     crossOriginEmbedderPolicy: false
// }));

// 3. Other middleware AFTER CORS/security
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 4. Routes
app.options('/waitlist', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://waitlist-netmifi.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});
app.use('/services', servicesRoutes);
app.use('/waitlist', waitlistRoutes);

connectToDb()
// .then(() => app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)))
// .catch(console.dir);

module.exports = app