"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var UserDto = /** @class */ (function () {
    function UserDto(data) {
        this.id = '';
        this.role = '';
        this.avatar = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.createdAt = '';
        if (data) {
            this.id = data.id;
            this.role = data.role;
            this.email = data.email;
            this.avatar = data.avatar || config_1.default.get('avatar');
            this.lastName = data.lastName || '';
            this.firstName = data.firstName || '';
            this.createdAt = data.createdAt;
        }
    }
    return UserDto;
}());
exports.UserDto = UserDto;
