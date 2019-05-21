const winston = require('winston');

module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new winston.transports.File({
            filename: '../logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: '../logs/combined.log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: '../logs/exceptions.log'
        })
    ]
});

