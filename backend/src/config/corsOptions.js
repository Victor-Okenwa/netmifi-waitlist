const allowedOrigins = require('./allowedOrigins');
// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Log incoming origin for debugging
        console.log('Incoming origin:', origin || 'No origin');

        // Allow requests with no origin (non-browser clients)
        // if (!origin) return callback(null, true);

        // Check against allowedOrigins with case-insensitive matching
        const normalizedOrigin = origin.toLowerCase();
        const isAllowed = allowedOrigins.some(allowed =>
            normalizedOrigin === allowed.toLowerCase()
        );

        console.log('Allowed origins:', allowedOrigins);
        console.log('Origin match:', isAllowed ? '✅ Approved' : '❌ Rejected');

        callback(isAllowed ? null : new Error('CORS blocked'), isAllowed);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
};


module.exports = corsOptions;