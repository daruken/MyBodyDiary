"use strict";
exports.__esModule = true;
exports.logger = void 0;
var winston = require("winston");
var winstonDaily = require('winston-daily-rotate-file');
var logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, printf = _a.printf;
// Define log format
var logFormat = printf(function (info) {
    return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
var logger = winston.createLogger({
    format: combine(timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), logFormat),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: "%DATE%.error.log",
            maxFiles: 30,
            zippedArchive: true
        }),
    ]
});
exports.logger = logger;
// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple())
    }));
}
