const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}][${info.level}] ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5555000,
            maxFiles: 5,
            filename: `../logs/combined.log`

        }),
        new transports.File({
            level: 'error',
            maxsize: 5555000,
            maxFiles: 5,
            filename: `../logs/errors.log`

        }),
        new transports.Console({
            level: 'debug'
        })
    ],
    exceptionHandlers: [
        new transports.File({
            filename: '../logs/exceptions.log'
        })
    ]
})