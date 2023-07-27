// config/log4js.ts

import * as path from 'path';
const baseLogPath = path.join(__dirname, '..', 'logs'); // 日志要写入哪个目录
console.log(__dirname,baseLogPath, 'baseLogPath' , '----------------------->')
const log4jsConfig = {
    appenders: {
        console: {
            type: 'console', // 会打印到控制台
        },
        // 统计日志
        access: {
            type: 'dateFile', // 会写入文件，并按照日期分类
            filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
            alwaysIncludePattern: true, // 为true, 则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
            pattern: 'yyyy-MM-dd', // 日期格式
            daysToKeep: 60, // 文件保存日期60天
            numBackups: 3, //  配置日志文件最多存在个数
            //compress: true,   // 配置日志文件是否压缩
            category: 'http', // category 类型
            keepFileExt: true, // 是否保留文件后缀
        },
        // 一些app的 应用日志
        app: {
            type: 'dateFile',
            filename: `${baseLogPath}/app-out/app.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyy-MM-dd',
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true,
        },
        // 异常日志
        errorFile: {
            type: 'dateFile',
            filename: `${baseLogPath}/errors/error.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },
    categories: {
        default: {
            appenders: ['console', 'access',  'app', 'errors'],
            level: 'DEBUG',
        },
        info: { appenders: ['console', 'app', 'errors'], level: 'info' },
        access: { appenders: ['console', 'app', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' },
    },
    pm2: true, // 使用 pm2 来管理项目时，打开
    pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;