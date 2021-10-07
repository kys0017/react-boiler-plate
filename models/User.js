const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type:  String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function(next) {

    let user = this
    // console.log(user)

    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err)
                user.password= hash
                next()
            })
        });
    }

})

const User = mongoose.model('User', userSchema)

module.exports = {User}