"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthorModule = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var author_controller_1 = require("./author.controller");
var author_service_1 = require("./author.service");
var Jwt_Strategy_1 = require("./passport/Jwt.Strategy");
var Local_Straategy_1 = require("./passport/Local.Straategy");
var AuthorModule = /** @class */ (function () {
    function AuthorModule() {
    }
    AuthorModule = __decorate([
        (0, common_1.Module)({
            imports: [passport_1.PassportModule],
            controllers: [author_controller_1.AuthorController],
            providers: [author_service_1.AuthorService, Local_Straategy_1.LocalStrategy, Jwt_Strategy_1.JwtStrategy]
        })
    ], AuthorModule);
    return AuthorModule;
}());
exports.AuthorModule = AuthorModule;
