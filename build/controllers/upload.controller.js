"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("boom"));
var uploadFile = function (req, res) {
    if (req.file && req.file.path) {
        return res.send({
            url: req.protocol + "://" + req.hostname + ":3003/" + req.file.path
        });
    }
    throw boom_1.default.unsupportedMediaType('User not found');
};
exports.default = {
    uploadFile: uploadFile
};
