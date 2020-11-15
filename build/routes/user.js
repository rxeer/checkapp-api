"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var check_1 = require("express-validator/check");
var auth_1 = __importDefault(require("./auth"));
var user_controller_1 = __importDefault(require("@/controllers/user.controller"));
var router = express_promise_router_1.default();
router.route('/login').post([
    check_1.body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    check_1.body('password').exists()
], auth_1.default.optional, user_controller_1.default.login);
router.route('/register').post([
    check_1.body('email')
        .isEmail()
        .exists()
        .withMessage('Email is not valid'),
    check_1.body('password').exists(),
    check_1.body('firstName').exists(),
    check_1.body('lastName').exists()
], auth_1.default.optional, user_controller_1.default.register);
router.route('/current').get(auth_1.default.required, user_controller_1.default.getCurrent);
router.route('/logout').post(function (req, res) {
    req.logout();
    res.redirect('/');
});
exports.default = router;
