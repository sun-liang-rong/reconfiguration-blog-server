"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Curd = void 0;
var apiresult_service_1 = require("../apiresult/apiresult.service");
var typeorm_1 = require("typeorm");
var Curd = /** @class */ (function () {
    function Curd(Entity) {
        var _this = this;
        this.Entity = Entity;
        this.apiresult = new apiresult_service_1.ApiresultService();
        this.findAll = function (query, join) { return __awaiter(_this, void 0, void 0, function () {
            var search, limit, page, result, totals, lastpage, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(join);
                        console.log(query, 'query');
                        search = query.search || '{}';
                        limit = Number(query.limit) || 10;
                        page = (Number(query.page) - 1) * limit || 0;
                        console.log(search, 'search');
                        if (!join) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, typeorm_1.getManager)()
                                .createQueryBuilder(this.Entity, 'entity')
                                .leftJoinAndSelect(join, 'children')
                                .where(JSON.parse(search))
                                .skip(page)
                                .take(limit)
                                .getMany()];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, typeorm_1.getManager)()
                            .createQueryBuilder(this.Entity, 'entity')
                            .where(JSON.parse(search))
                            .skip(page)
                            .take(limit)
                            .getMany()];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, (0, typeorm_1.getManager)()
                            .createQueryBuilder(this.Entity, 'entity')
                            .where(JSON.parse(search))
                            .getCount()];
                    case 5:
                        totals = _a.sent();
                        lastpage = Math.ceil(totals / limit);
                        data = {
                            totals: totals,
                            data: result,
                            lastpage: lastpage,
                            page: page + 1
                        };
                        return [4 /*yield*/, this.apiresult.MESSAGE(200, '查询成功', data)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.create = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.getManager)()
                            .createQueryBuilder()
                            .insert()
                            .into(this.Entity)
                            .values(body)
                            .execute()];
                    case 1:
                        data = _a.sent();
                        console.log(data.raw.affectedRows);
                        if (data.raw.affectedRows > 0) {
                            return [2 /*return*/, this.apiresult.message(200, '添加成功')];
                        }
                        else {
                            return [2 /*return*/, this.apiresult.message(500, '插入失败')];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.update = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.getManager)()
                            .createQueryBuilder()
                            .update(this.Entity)
                            .set(body)
                            .where('id = :id', { id: body.id })
                            .execute()];
                    case 1:
                        data = _a.sent();
                        console.log(data.affected);
                        if (data.affected > 0) {
                            return [2 /*return*/, this.apiresult.message(200, '更新成功')];
                        }
                        else {
                            return [2 /*return*/, this.apiresult.message(500, '更新失败')];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.remove = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, typeorm_1.getManager)()
                            .createQueryBuilder()["delete"]()
                            .from(this.Entity)
                            .where('id = :id', { id: id })
                            .execute()];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        if (data.affected > 0) {
                            return [2 /*return*/, this.apiresult.message(200, '删除成功')];
                        }
                        else {
                            return [2 /*return*/, this.apiresult.message(500, '删除失败')];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return Curd;
}());
exports.Curd = Curd;
