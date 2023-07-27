"use strict";
// config/log4js.ts
exports.__esModule = true;
var path = require("path");
var baseLogPath = path.join(__dirname, '..', 'logs'); // 日志要写入哪个目录
console.log(__dirname, baseLogPath, 'baseLogPath', '----------------------->');
var log4jsConfig = {
    appenders: {
        console: {
            type: 'console'
        },
        // 统计日志
        access: {
            type: 'dateFile',
            filename: "".concat(baseLogPath, "/access/access.log"),
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd',
            daysToKeep: 60,
            numBackups: 3,
            //compress: true,   // 配置日志文件是否压缩
            category: 'http',
            keepFileExt: true
        },
        // 一些app的 应用日志
        app: {
            type: 'dateFile',
            filename: "".concat(baseLogPath, "/app-out/app.log"),
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyy-MM-dd',
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true
        },
        // 异常日志
        errorFile: {
            type: 'dateFile',
            filename: "".concat(baseLogPath, "/errors/error.log"),
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile'
        }
    },
    categories: {
        "default": {
            appenders: ['console', 'access', 'app', 'errors'],
            level: 'DEBUG'
        },
        info: { appenders: ['console', 'app', 'errors'], level: 'info' },
        access: { appenders: ['console', 'app', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
};
exports["default"] = log4jsConfig;
