"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var User_1 = __importDefault(require("@/models/User"));
var passportOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
if (config_1.default.has('auth.secret')) {
    passportOptions.secretOrKey = config_1.default.get('auth.secret');
}
var strategy = new passport_jwt_1.Strategy(passportOptions, function (jwtPayload, next) {
    //  @ts-ignore
    User_1.default.getById(jwtPayload.id)
        .then(function (user) {
        if (user && user.validatePassword('123123')) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    })
        .catch(function () {
        next(null, false);
    });
});
passport_1.default.use(strategy);
