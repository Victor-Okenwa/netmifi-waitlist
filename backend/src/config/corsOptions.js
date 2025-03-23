const allowedOrigins = require('./allowedOrigins');
// CORS configuration
// const corsOptions = {
// origin: function (origin, callback) {
// Log incoming origin for debugging
// console.log('Incoming origin:', origin || 'No origin');

// Allow requests with no origin (non-browser clients)
// if (!origin) return callback(null, true);

// Check against allowedOrigins with case-insensitive matching
// const normalizedOrigin = origin.toLowerCase();
// const isAllowed = allowedOrigins.some(allowed =>
//     normalizedOrigin === allowed.toLowerCase()
// );

//     console.log('Allowed origins:', allowedOrigins);
//     console.log('Origin match:', isAllowed ? '✅ Approved' : '❌ Rejected');

//     callback(isAllowed ? null : new Error('CORS blocked'), isAllowed);
// },
// methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
// headers: [
//     { key: "Access-Control-Allow-Credentials", value: "true" },
//     { key: "Access-Control-Allow-Origin", value: "*" },
//     { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
// ],
// credentials: true,
//     optionsSuccessStatus: 200,
//         preflightContinue: false
// };

const corsOptions = {
    origin: '*', // Allow ALL origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'], // Allow ALL headers
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: false // Must be false when origin is '*'
};

module.exports = corsOptions;