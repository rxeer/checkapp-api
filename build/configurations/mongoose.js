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
var config_1 = __importDefault(require("config"));
var mongoose_1 = __importDefault(require("mongoose"));
exports.configureConnection = function (options) {
    if (options === void 0) { options = {}; }
    if (config_1.default.has('database.config.host')) {
        var dbHost = config_1.default.get('database.config.host');
        mongoose_1.default.Promise = Promise;
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.set('useFindAndModify', false);
        //@ts-ignore
        mongoose_1.default.connect(dbHost, __assign({ useNewUrlParser: true, useUnifiedTopology: true }, options));
    }
};
