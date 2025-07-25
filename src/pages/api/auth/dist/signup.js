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
var dbConnect_1 = require("@/lib/dbConnect");
var User_1 = require("@/models/User");
var bcryptjs_1 = require("bcryptjs");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userName, email, password, existingUser, hashedPassword, newUser, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (req.method !== "POST") {
                        console.log("Invalid method:", req.method);
                        return [2 /*return*/, res.status(405).json({ message: "Method Not Allowed" })];
                    }
                    _a = req.body, userName = _a.userName, email = _a.email, password = _a.password;
                    console.log(req.body);
                    if (!userName || !email || !password) {
                        console.log("Missing fields:", { userName: userName, email: email, password: password });
                        return [2 /*return*/, res.status(400).json({ message: "All fields are required" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    console.log("Connecting to database...");
                    return [4 /*yield*/, dbConnect_1["default"]()];
                case 2:
                    _b.sent();
                    console.log("Database connected - in signup.ts");
                    return [4 /*yield*/, User_1["default"].findOne({ email: email })];
                case 3:
                    existingUser = _b.sent();
                    if (existingUser)
                        return [2 /*return*/, res.status(400).json({ message: "User already exists" })];
                    return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
                case 4:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, User_1["default"].create({
                            userName: userName,
                            email: email,
                            password: hashedPassword
                        })];
                case 5:
                    newUser = _b.sent();
                    return [4 /*yield*/, newUser.save()];
                case 6:
                    _b.sent();
                    return [2 /*return*/, res.status(201).json({ message: "User created", user: { email: newUser.email, userName: newUser.userName } })];
                case 7:
                    err_1 = _b.sent();
                    console.log("Signup error:", err_1);
                    return [2 /*return*/, res.status(500).json({ message: "Something went wrong" })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = handler;
