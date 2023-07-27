"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.logger = exports.LoggerMiddleware = void 0;
// src/middleware/logger.middleware.ts
var common_1 = require("@nestjs/common");
var log4js_1 = require("../utils/log4js");
var LoggerMiddleware = /** @class */ (function () {
    function LoggerMiddleware() {
    }
    LoggerMiddleware.prototype.use = function (req, res, next) {
        var code = res.statusCode; // 响应状态码
        next();
        // 组装日志信息
        var logFormat = "Method: ".concat(req.method, "\n     Request original url: ").concat(req.originalUrl, "\n     IP: ").concat(req.ip, "\n     Status code: ").concat(code, "\n    ");
        // 根据状态码，进行日志类型区分
        if (code >= 500) {
            log4js_1.Logger.error(logFormat);
        }
        else if (code >= 400) {
            log4js_1.Logger.warn(logFormat);
        }
        else {
            log4js_1.Logger.access(logFormat);
            log4js_1.Logger.log(logFormat);
        }
    };
    LoggerMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], LoggerMiddleware);
    return LoggerMiddleware;
}());
exports.LoggerMiddleware = LoggerMiddleware;
// 函数式中间件
function logger(req, res, next) {
    var code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    var logFormat = " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n    Request original url: ".concat(req.originalUrl, "\n    Method: ").concat(req.method, "\n    IP: ").concat(req.ip, "\n    Status code: ").concat(code, "\n    Parmas: ").concat(JSON.stringify(req.params), "\n    Query: ").concat(JSON.stringify(req.query), "\n    Body: ").concat(JSON.stringify(req.body), "\n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n  ");
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
        log4js_1.Logger.error(logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(logFormat);
    }
    else {
        log4js_1.Logger.access(logFormat);
        log4js_1.Logger.log(logFormat);
    }
}
exports.logger = logger;
