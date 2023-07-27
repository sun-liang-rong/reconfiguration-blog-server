"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DbModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var db_service_1 = require("./db.service");
var blog_entity_1 = require("./Entitys/blog.entity");
var tag_entity_1 = require("./Entitys/tag.entity");
var user_entity_1 = require("./Entitys/user.entity");
var link_entity_1 = require("./Entitys/link.entity");
var adminUser_entity_1 = require("./Entitys/adminUser.entity");
var jwt_1 = require("@nestjs/jwt");
var Entity = typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, tag_entity_1.Tag, blog_entity_1.Blog, link_entity_1.Link, adminUser_entity_1.AdminUser]);
var DbModule = /** @class */ (function () {
    function DbModule() {
    }
    DbModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: '12345678',
                    database: 'blog',
                    entities: [user_entity_1.User, tag_entity_1.Tag, blog_entity_1.Blog, link_entity_1.Link, adminUser_entity_1.AdminUser],
                    synchronize: true,
                    logging: false
                }),
                jwt_1.JwtModule.register({
                    secret: 'sunliangrong'
                }),
            ],
            providers: [db_service_1.DbService],
            exports: [db_service_1.DbService, Entity, jwt_1.JwtModule]
        })
    ], DbModule);
    return DbModule;
}());
exports.DbModule = DbModule;
