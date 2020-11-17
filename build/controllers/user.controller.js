"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("boom"));
var User_1 = __importDefault(require("@/models/User"));
var models_1 = require("@/@types/models");
var login = function (req, res) {
    return (User_1.default.findOne({ email: req.body.email })
        //  @ts-ignore
        .then(function (user) {
        if (user && user.validatePassword(req.body.password)) {
            return res.send(user.toAuthJSON());
        }
    })
        .catch(function () {
        res.json(boom_1.default.notFound('Email or password incorrect'));
    }));
};
var register = function (req, res) {
    var user = req.body;
    var finalUser = new User_1.default(user);
    finalUser.setPassword(user.password);
    return finalUser
        .save()
        .then(function () { return res.json(finalUser.toAuthJSON()); })
        .catch(function () {
        res.json(boom_1.default.notFound('User already exist'));
    });
};
var getCurrent = function (req, res) {
    var id = req.payload.id;
    //  @ts-ignore
    return User_1.default.getById(id).then(function (user) {
        if (!user) {
            throw boom_1.default.notFound('User not found');
        }
        //  @ts-ignore
        return res.json(new models_1.UserDto(__assign(__assign({}, user._doc), { id: id })));
    });
};
exports.default = {
    login: login,
    register: register,
    getCurrent: getCurrent,
};
