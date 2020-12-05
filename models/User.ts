import crypto from 'crypto';
import config from 'config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import uniqueValidator from 'mongoose-unique-validator';

import { IUserInterface } from '@/@types/models';

const { Schema } = mongoose;
const userSchema = new Schema({
  role: {
    type: String,
    default: 'USER',
  },
  hash: String,
  salt: String,
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  onboardCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, require: true, unique: 'This email is already used' },
});

userSchema.methods = {
  setPassword(password: string) {
    if (config.has('auth.hash')) {
      const authJWTHash: string = config.get('auth.hash');

      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, authJWTHash)
        .toString('hex');
    }
  },

  validatePassword(password: string) {
    if (config.has('auth.hash')) {
      const authJWTHash: string = config.get('auth.hash');

      const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, authJWTHash)
        .toString('hex');
      return this.hash === hash;
    }
  },

  generateJWT() {
    if (config.has('auth.secret')) {
      const today: Date = new Date();
      const expirationDate: Date = new Date(today);
      expirationDate.setDate(today.getDate() + 60);
      const authSecret: string = config.get('auth.secret');

      return jwt.sign(
        {
          email: this.email,
          id: this._id,
          exp: expirationDate.getTime() / 1000,
        },
        authSecret
      );
    }
  },

  toAuthJSON() {
    const refreshToken: string = randtoken.uid(256);

    return {
      accessToken: this.generateJWT(),
      refreshToken,
    };
  },
};

userSchema.statics = {
  getById(_id: string) {
    return this.findOne({ _id })
      .select({ password: 0 })
      .exec()
      .then((user: IUserInterface) => user);
  },
};

userSchema.plugin(uniqueValidator);
export default mongoose.model<IUserInterface>('User', userSchema);
