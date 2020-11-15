"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var UserDto = /** @class */ (function () {
    function UserDto(data) {
        this.role = '';
        this.avatar = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.created_at = '';
        if (data) {
            this.role = data.role;
            this.email = data.email;
            this.avatar = data.avatar || config_1.default.get('avatar');
            this.lastName = data.lastName || '';
            this.firstName = data.firstName || '';
            this.created_at = data.created_at;
        }
    }
    return UserDto;
}());
exports.UserDto = UserDto;
