const crypto = require('crypto')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: function () {
            return !this.phone;
        },
        unique: [true, 'Email already exist'],
        lowercase: true,
    },

    phone: {
        type: String,
        required: function () {
            return !this.email;
        },
        unique: [true, 'Phone already exist'],
    },
    profile_image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        // select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

    next();
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
