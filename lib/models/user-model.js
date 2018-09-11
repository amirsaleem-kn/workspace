const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const jwtSecret = keys.jwtSecret;

const contactNumbers = new Schema({ contact: String  });

const userSchemaObject = {
    firstName: { type: String, lowercase: true, trim: true },
    middleName: { type: String, lowercase: true, trim: true },
    lastName: { type: String, lowercase: true, trim: true },
    contactNumbers: contactNumbers,
    primaryContactNumber: { type: String },
    countryCode: { type: String, uppercase: true },
    country: { type: String },
    gender: { type: String, lowercase: true, enum: ['male', 'female', 'other', 'secret'] },
    dob: { type: Number },
    active: { type: Boolean, required: true },
    profilePicture: { type: String },
    userName: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    googleID: { type: String },
    facebookID: { type: String },
    twitterID: { type: String },
    linkedINID: { type: String },
    githubID: { type: String },
    salt: { type: String },
    hash: { type: String }
};

const userSchema = new Schema(userSchemaObject, { timestamps: true });

userSchema.methods.setPassword = function ( password ) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function ( password ) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.userName,
        exp: parseInt(exp.getTime() / 1000)
    }, jwtSecret);
}

userSchema.methods.toAuthJSON = function(){
     return {
        username: this.userName,
        email: this.email,
        token: this.generateJWT(),
    };
};

mongoose.model('users', userSchema);