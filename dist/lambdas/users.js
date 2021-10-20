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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUsers = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = require("../config/index");
var utils_1 = require("../utils");
var aws_sdk_1 = require("aws-sdk");
var uuid_1 = require("uuid");
var db = new aws_sdk_1.DynamoDB.DocumentClient();
var userTable = process.env.USERS_TABLE || '';
// @route   GET api/users
// @desc    Get all users
// @access  Private
exports.getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var Items, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db
                        .scan({
                        TableName: userTable
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
// @route   POST api/users
// @desc    Create a user
// @access  Public
exports.createUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, username, password, firstName, lastName, email, foundUsernames, foundEmails, salt, hashedPassword, user, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                body = event.body;
                _a = JSON.parse(body), username = _a.username, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
                if (!username || !password || !firstName || !lastName || !email) {
                    return [2 /*return*/, utils_1.response(400)];
                }
                return [4 /*yield*/, db
                        .scan({
                        TableName: userTable,
                        FilterExpression: 'username = :username',
                        ExpressionAttributeValues: {
                            ':username': username
                        },
                        Limit: 1
                    })
                        .promise()];
            case 1:
                foundUsernames = (_b.sent()).Items;
                if (foundUsernames && foundUsernames.length > 0) {
                    return [2 /*return*/, utils_1.response(400, { message: 'Username already exists' })];
                }
                return [4 /*yield*/, db
                        .scan({
                        TableName: userTable,
                        FilterExpression: 'email = :email',
                        ExpressionAttributeValues: {
                            ':email': email
                        },
                        Limit: 1
                    })
                        .promise()];
            case 2:
                foundEmails = (_b.sent()).Items;
                if (foundEmails && foundEmails.length > 0) {
                    return [2 /*return*/, utils_1.response(400, { message: 'Email already exists' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 4:
                hashedPassword = _b.sent();
                user = {
                    id: uuid_1.v4(),
                    username: username,
                    password: hashedPassword,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    admin: false,
                    createdOn: Date.now()
                };
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ id: user.id }, index_1.secret, {
                        expiresIn: 3600
                    })];
            case 5:
                token = _b.sent();
                return [4 /*yield*/, db
                        .put({
                        TableName: userTable,
                        Item: user
                    })
                        .promise()];
            case 6:
                _b.sent();
                return [2 /*return*/, utils_1.response(200, {
                        token: token,
                        user: user
                    })];
            case 7:
                err_2 = _b.sent();
                return [2 /*return*/, utils_1.response(500)];
            case 8: return [2 /*return*/];
        }
    });
}); };
// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
exports.deleteUser = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var pathParameters, id, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pathParameters = event.pathParameters;
                id = pathParameters.id;
                return [4 /*yield*/, db
                        .delete({
                        TableName: userTable,
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
