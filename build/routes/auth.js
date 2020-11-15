"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var express_jwt_1 = __importDefault(require("express-jwt"));
var authSecret = config_1.default.get('auth.secret');
var getTokenFromHeaders = function (req) {
    var authorization = req.headers.authorization;
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }
    return null;
};
var auth = {
    required: express_jwt_1.default({
        secret: authSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: express_jwt_1.default({
        secret: authSecret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    })
};
exports.default = auth;
