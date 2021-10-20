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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = exports.getTasks = void 0;
var utils_1 = require("../utils");
var aws_sdk_1 = require("aws-sdk");
var uuid_1 = require("uuid");
var db = new aws_sdk_1.DynamoDB.DocumentClient();
var tasksTable = process.env.TASKS_TABLE || '';
// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
exports.getTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var Items, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db
                        .scan({
                        TableName: tasksTable
                    })
                        .promise()];
            case 1:
                Items = (_a.sent()).Items;
                return [2 /*return*/, utils_1.response(200, Items)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, utils_1.response(500)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// @route   POST api/tasks
// @desc    Create a task
// @access  Private
exports.createTask = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, title, category, description, important, task, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                body = event.body;
                _a = JSON.parse(body), title = _a.title, category = _a.category, description = _a.description, important = _a.important;
                if (!title || !category || !description || !important) {
                    return [2 /*return*/, utils_1.response(400)];
                }
                task = {
                    id: uuid_1.v4(),
                    title: title,
                    category: category,
                    description: description,
                    important: important,
                    date: Date.now()
                };
                return [4 /*yield*/, db
                        .put({
                        TableName: tasksTable,
                        Item: task
                    })
                        .promise()];
            case 1:
                _b.sent();
                return [2 /*return*/, utils_1.response(200, task)];
            case 2:
                err_2 = _b.sent();
                return [2 /*return*/, utils_1.response(500)];
            case 3: return [2 /*return*/];
        }
    });
}); };
// @route   DELETE api/tasks
// @desc    Delete a task
// @access  Private
exports.deleteTask = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var pathParameters, id, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pathParameters = event.pathParameters;
                id = pathParameters.id;
                return [4 /*yield*/, db
                        .delete({
                        TableName: tasksTable,
                        Key: {
                            id: id
                        }
                    })
                        .promise()];
            case 1:
                _a.sent();
                return [2 /*return*/, utils_1.response(200)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, utils_1.response(500)];
            case 3: return [2 /*return*/];
        }
    });
}); };
