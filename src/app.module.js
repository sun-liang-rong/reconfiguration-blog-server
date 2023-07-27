"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var db_1 = require("libs/db");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var apiresult_service_1 = require("./apiresult/apiresult.service");
var apiresult_module_1 = require("./apiresult/apiresult.module");
var tags_module_1 = require("./tags/tags.module");
var blog_service_1 = require("./blog/blog.service");
var blog_module_1 = require("./blog/blog.module");
var links_module_1 = require("./links/links.module");
var author_module_1 = require("./author/author.module");
var comments_controller_1 = require("./comments/comments.controller");
var comments_module_1 = require("./comments/comments.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [db_1.DbModule, apiresult_module_1.ApiresultModule, tags_module_1.TagsModule, blog_module_1.BlogModule, links_module_1.LinksModule, author_module_1.AuthorModule, comments_module_1.CommentsModule],
            controllers: [app_controller_1.AppController, comments_controller_1.CommentsController],
            providers: [app_service_1.AppService, apiresult_service_1.ApiresultService, blog_service_1.BlogService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
