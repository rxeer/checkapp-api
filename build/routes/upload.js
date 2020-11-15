"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var storage_1 = __importDefault(require("@/configurations/storage"));
var upload_controller_1 = __importDefault(require("@/controllers/upload.controller"));
var router = express_promise_router_1.default();
router.route('/file').post(storage_1.default.single('file'), upload_controller_1.default.uploadFile);
exports.default = router;
