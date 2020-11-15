"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var config_1 = __importDefault(require("config"));
var mongoose_1 = __importDefault(require("mongoose"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var rand_token_1 = __importDefault(require("rand-token"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    role: {
        type: String,
        default: 'USER'
    },
    hash: String,
    salt: String,
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    email: { type: String, require: true, unique: 'This email is already used' }
});
userSchema.methods = {
    setPassword: function (password) {
        if (config_1.default.has('auth.hash')) {
            var authJWTHash = config_1.default.get('auth.hash');
            this.salt = crypto_1.default.randomBytes(16).toString('hex');
            this.hash = crypto_1.default
                .pbkdf2Sync(password, this.salt, 10000, 512, authJWTHash)
                .toString('hex');
        }
    },
    validatePassword: function (password) {
        if (config_1.default.has('auth.hash')) {
            var authJWTHash = config_1.default.get('auth.hash');
            var hash = crypto_1.default
                .pbkdf2Sync(password, this.salt, 10000, 512, authJWTHash)
                .toString('hex');
            return this.hash === hash;
        }
    },
    generateJWT: function () {
        if (config_1.default.has('auth.secret')) {
            var today = new Date();
            var expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 60);
            var authSecret = config_1.default.get('auth.secret');
            return jsonwebtoken_1.default.sign({
                email: this.email,
                id: this._id,
                exp: expirationDate.getTime() / 1000
            }, authSecret);
        }
    },
    toAuthJSON: function () {
        var refreshToken = rand_token_1.default.uid(256);
        return {
            token: this.generateJWT(),
            refreshToken: refreshToken
        };
    }
};
userSchema.statics = {
    getById: function (_id) {
        return this.findOne({ _id: _id })
            .select({ password: 0 })
            .exec()
            .then(function (user) { return user; });
    }
};
userSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('User', userSchema);
