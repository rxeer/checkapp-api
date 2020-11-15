"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./user"));
var upload_1 = __importDefault(require("./upload"));
var income_1 = __importDefault(require("./income"));
var router = express_1.default.Router();
router.use('/users', user_1.default);
router.use('/income', income_1.default);
router.use('/upload', upload_1.default);
exports.default = router;
