import crypto from 'crypto';
import config from 'config';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import uniqueValidator from 'mongoose-unique-validator';

import { IUserInterface } from '@/@types/models';

const userSchema: Schema = new Schema({
  //  @ts-ignore
  role: {
    type: String,
    default: 'USER',
  },
  //  @ts-ignore
  hash: String,
  //  @ts-ignore
  salt: String,
  //  @ts-ignore
  firstName: { type: String },
  //  @ts-ignore
  lastName: { type: String },
  //  @ts-ignore
  currency: { type: String },
  //  @ts-ignore
  avatar: { type: String },
  //  @ts-ignore
  onboardCompleted: { type: Boolean, default: false },
  //  @ts-ignore

  createdAt: { type: Date, default: Date.now },
  email: { type: String, require: true, unique: true },
});

userSchema.methods = {
  setPassword(password: string) {
    if (config.has('auth.hash')) {
      const authJWTHash: string = config.get('auth.hash');

      //  @ts-ignore
      this.salt = crypto.randomBytes(16).toString('hex');
      //  @ts-ignore\
      this.hash = crypto
        //  @ts-ignore
        .pbkdf2Sync(password, this.salt, 10000, 512, authJWTHash)
        .toString('hex');
    }
  },

  validatePassword(password: string) {
    if (config.has('auth.hash')) {
      const authJWTHash: string = config.get('auth.hash');

      //  @ts-ignore
      const hash = crypto
        //  @ts-ignore
        .pbkdf2Sync(password, this.salt, 10000, 512, authJWTHash)
        .toString('hex');
      //  @ts-ignore
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

userSchema.plugin(uniqueValidator, { message: 'This email is already used' });
export default mongoose.model<IUserInterface>('User', userSchema);
