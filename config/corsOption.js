// cors = Cross Origin Resource Sharing
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;