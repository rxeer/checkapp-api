"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncomeDto = /** @class */ (function () {
    function IncomeDto(data) {
        this.name = '';
        this.price = 0;
        this.date = new Date();
        this.description = '';
        if (data) {
            this.name = data.name;
            this.date = data.date;
            this.price = data.price;
            this.description = data.description;
        }
    }
    return IncomeDto;
}());
exports.IncomeDto = IncomeDto;
