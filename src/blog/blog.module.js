"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogModule = void 0;
var common_1 = require("@nestjs/common");
var blog_controller_1 = require("./blog.controller");
var blog_service_1 = require("./blog.service");
var BlogModule = /** @class */ (function () {
    function BlogModule() {
    }
    BlogModule = __decorate([
        (0, common_1.Module)({
            providers: [blog_service_1.BlogService],
            controllers: [blog_controller_1.BlogController]
        })
    ], BlogModule);
    return BlogModule;
}());
exports.BlogModule = BlogModule;
