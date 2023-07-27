"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TagsModule = void 0;
var common_1 = require("@nestjs/common");
var tags_service_1 = require("./tags.service");
var tags_controller_1 = require("./tags.controller");
var TagsModule = /** @class */ (function () {
    function TagsModule() {
    }
    TagsModule = __decorate([
        (0, common_1.Module)({
            providers: [tags_service_1.TagsService],
            controllers: [tags_controller_1.TagsController]
        })
    ], TagsModule);
    return TagsModule;
}());
exports.TagsModule = TagsModule;
