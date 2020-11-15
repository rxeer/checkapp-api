"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncomeStatisticDto = /** @class */ (function () {
    function IncomeStatisticDto(data) {
        this.labels = [];
        this.data = [];
        if (data) {
            this.data = data.data;
            this.labels = data.labels;
        }
    }
    return IncomeStatisticDto;
}());
exports.IncomeStatisticDto = IncomeStatisticDto;
