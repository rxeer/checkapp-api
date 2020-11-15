"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("boom"));
var IncomeStatistics_1 = __importDefault(require("@/models/IncomeStatistics"));
var models_1 = require("@/@types/models");
var get = function (req, res) {
    return IncomeStatistics_1.default.find()
        .exec()
        .then(function (data) {
        return res.send(data
            ? data[data.length - 1]
            : new models_1.IncomeStatisticDto({ labels: [], data: [] }));
    });
};
var update = function (_a) {
    var price = _a.price, date = _a.date;
    return IncomeStatistics_1.default.find().then(function (statistics) {
        var currentStatistics = statistics[statistics.length - 1] || {};
        var data = currentStatistics.data || [];
        var labels = currentStatistics.labels || [];
        labels.push(date);
        data.push(price);
        return IncomeStatistics_1.default.create({ data: data, labels: labels }).catch(function (err) {
            throw boom_1.default.notFound(err);
        });
    });
};
exports.default = {
    get: get,
    update: update
};
