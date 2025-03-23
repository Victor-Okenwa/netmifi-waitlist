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
// app.use(cors());
// if (stageEnv === 'development') {
//     app.use(
//         helmet({
//             contentSecurityPolicy: {
//                 directives: {
//                     defaultSrc: ["'self'", 'localhost:*'],
//                     imgSrc: ["'self'", 'localhost:*', 'https://example.com'],
//                     scriptSrc: ["'self'", 'https://trusted-scripts.com'],
//                 },
//             },
//         })
//     );
// } else {
//     app.use(helmet({
//         contentSecurityPolicy: {
//             directives: {
//                 defaultSrc: ["'self'"],
//                 scriptSrc: ["'self'", "https://waitlist-netmifi.vercel.app"],
//                 connectSrc: ["'self'", "https://netmifi-waitlist.vercel.app"]
//             }
//         },
//         crossOriginResourcePolicy: { policy: "cross-origin" }
//     })); // Use default settings in production
// }
// app.options('*', cors(corsOptions));

app.use(limiter);
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use('/services', servicesRoutes);
app.use('/waitlist', waitlistRoutes);

connectToDb()
    .then(() => app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`)))
    .catch(console.dir);