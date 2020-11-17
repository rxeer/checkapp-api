"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("boom"));
var Income_1 = __importDefault(require("@/models/Income"));
var models_1 = require("@/@types/models");
var income_statistics_controller_1 = __importDefault(require("@/controllers/income-statistics.controller"));
var get = function (req, res) {
    return Income_1.default.find()
        .sort({ created_at: 'desc' })
        .exec()
        .then(function (data) { return res.send(data); })
        .catch(function (err) { return res.send(boom_1.default.notFound(err)); });
};
var create = function (req, res) {
    return Income_1.default.create(new models_1.IncomeDto(req.body))
        .then(function (data) {
        income_statistics_controller_1.default.update(data);
        return res.send(data);
    })
        .catch(function (err) { return res.send(boom_1.default.notFound(err)); });
};
var remove = function (req, res) {
    return Income_1.default.findOneAndRemove({ _id: req.params.incomeId })
        .then(function (data) {
        if (data) {
            res.send({ id: data._id });
        }
        else {
            res.send(boom_1.default.notFound('Income id not found'));
        }
    })
        .catch(function (err) { return res.send(boom_1.default.notFound(err)); });
};
var update = function (req, res) {
    return Income_1.default.findOneAndUpdate({ _id: req.params.incomeId }, { $set: new models_1.IncomeDto(req.body) }, { new: true })
        .then(function (data) {
        if (data) {
            res.send(data);
        }
        else {
            res.send(boom_1.default.notFound('Income id not found'));
        }
    })
        .catch(function (err) { return res.send(boom_1.default.notFound(err)); });
};
exports.default = {
    get: get,
    create: create,
    remove: remove,
    update: update,
};
