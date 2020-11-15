"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var check_1 = require("express-validator/check");
var auth_1 = __importDefault(require("./auth"));
var income_controller_1 = __importDefault(require("@/controllers/income.controller"));
var income_statistics_controller_1 = __importDefault(require("@/controllers/income-statistics.controller"));
var router = express_promise_router_1.default();
router
    .route('/')
    .post([
    check_1.body('price').exists(),
    check_1.body('name')
        .isString()
        .exists()
], auth_1.default.required, income_controller_1.default.create)
    .get(auth_1.default.required, income_controller_1.default.get);
router
    .route('/:incomeId')
    .put([check_1.param('incomeId').isMongoId()], auth_1.default.required, income_controller_1.default.update)
    .delete([check_1.param('incomeId').isMongoId()], auth_1.default.required, income_controller_1.default.remove);
router.route('/statistic').get(auth_1.default.required, income_statistics_controller_1.default.get);
exports.default = router;
