"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LinksModule = void 0;
var common_1 = require("@nestjs/common");
var links_controller_1 = require("./links.controller");
var links_service_1 = require("./links.service");
var LinksModule = /** @class */ (function () {
    function LinksModule() {
    }
    LinksModule = __decorate([
        (0, common_1.Module)({
            controllers: [links_controller_1.LinksController],
            providers: [links_service_1.LinksService]
        })
    ], LinksModule);
    return LinksModule;
}());
exports.LinksModule = LinksModule;
