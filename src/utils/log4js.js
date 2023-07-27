"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Logger = exports.ContextTrace = exports.LoggerLevel = void 0;
// src/utils/log4js.ts
var Path = require("path");
var Log4js = require("log4js");
var Util = require("util");
var Moment = require("moment"); // 处理时间的工具
var StackTrace = require("stacktrace-js");
var chalk_1 = require("chalk");
var log4js_1 = require("../config/log4js");
// 日志级别
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["ALL"] = "ALL";
    LoggerLevel["MARK"] = "MARK";
    LoggerLevel["TRACE"] = "TRACE";
    LoggerLevel["DEBUG"] = "DEBUG";
    LoggerLevel["INFO"] = "INFO";
    LoggerLevel["WARN"] = "WARN";
    LoggerLevel["ERROR"] = "ERROR";
    LoggerLevel["FATAL"] = "FATAL";
    LoggerLevel["OFF"] = "OFF";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
// 内容跟踪类
var ContextTrace = /** @class */ (function () {
    function ContextTrace(context, path, lineNumber, columnNumber) {
        this.context = context;
        this.path = path;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }
    return ContextTrace;
}());
exports.ContextTrace = ContextTrace;
// 添加用户自定义的格式化布局函数。
Log4js.addLayout('Awesome-nest', function (logConfig) {
    return function (logEvent) {
        var moduleName = '';
        var position = '';
        // 日志组装
        var messageList = [];
        logEvent.data.forEach(function (value) {
            if (value instanceof ContextTrace) {
                moduleName = value.context;
                // 显示触发日志的坐标（行，列）
                if (value.lineNumber && value.columnNumber) {
                    position = "".concat(value.lineNumber, ", ").concat(value.columnNumber);
                }
                return;
            }
            if (typeof value !== 'string') {
                value = Util.inspect(value, false, 3, true);
            }
            messageList.push(value);
        });
        // 日志组成部分
        var messageOutput = messageList.join(' ');
        var positionOutput = position ? " [".concat(position, "]") : '';
        var typeOutput = "[".concat(logConfig.type, "] ").concat(logEvent.pid.toString(), "   - ");
        var dateOutput = "".concat(Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss'));
        var moduleOutput = moduleName ? "[".concat(moduleName, "] ") : '[LoggerService] ';
        var levelOutput = "[".concat(logEvent.level, "] ").concat(messageOutput);
        // 根据日志级别，用不同颜色区分
        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutput = chalk_1["default"].green(levelOutput);
                break;
            case LoggerLevel.INFO:
                levelOutput = chalk_1["default"].cyan(levelOutput);
                break;
            case LoggerLevel.WARN:
                levelOutput = chalk_1["default"].yellow(levelOutput);
                break;
            case LoggerLevel.ERROR:
                levelOutput = chalk_1["default"].red(levelOutput);
                break;
            case LoggerLevel.FATAL:
                levelOutput = chalk_1["default"].hex('#DD4C35')(levelOutput);
                break;
            default:
                levelOutput = chalk_1["default"].grey(levelOutput);
                break;
        }
        return "".concat(chalk_1["default"].green(typeOutput)).concat(dateOutput, "  ").concat(chalk_1["default"].yellow(moduleOutput)).concat(levelOutput).concat(positionOutput);
    };
});
// 注入配置
Log4js.configure(log4js_1["default"]);
// 实例化
var logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.trace.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.debug.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.info.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.info.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.warn.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.warn.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.error.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.fatal.apply(logger, __spreadArray([Logger.getStackTrace()], args, false));
    };
    Logger.access = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var loggerCustom = Log4js.getLogger('http');
        loggerCustom.info.apply(loggerCustom, __spreadArray([Logger.getStackTrace()], args, false));
    };
    // 日志追踪，可以追溯到哪个文件、第几行第几列
    Logger.getStackTrace = function (deep) {
        if (deep === void 0) { deep = 2; }
        var stackList = StackTrace.getSync();
        var stackInfo = stackList[deep];
        var lineNumber = stackInfo.lineNumber;
        var columnNumber = stackInfo.columnNumber;
        var fileName = stackInfo.fileName;
        var basename = Path.basename(fileName);
        return "".concat(basename, "(line: ").concat(lineNumber, ", column: ").concat(columnNumber, "):\n");
    };
    return Logger;
}());
exports.Logger = Logger;
