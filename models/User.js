const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

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
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567    암호화된 비밀번호 $2b$10$Os35EjjXb/oM6CVTb1IRYOk5Sc6AgnRg3MbC9WSHX0t17zoz0Q6yK
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {

    var user = this

    // jsonwebtoken 을 이용해서 token 을 생성하기
    user.token = jwt.sign(user._id.toHexString(), process.env.JWT_TOKEN_KEY);
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    });

};

userSchema.methods.findByToken = function (token, cb) {
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, process.env.JWT_TOKEN_KEY, function (err, decoded) {
        // 토큰키를 이용해서 user 를 구한다. (디코드)
        // 클라이언트에서 가져온 token과 DB 에 보관된 토큰이 일치하는지 확인
        user.findOne({_id: decoded, token: token}, function (err, user) {
            if(err) return cb(err)
            cb(null, user)
        });
    });
};

const User = mongoose.model('User', userSchema)

module.exports = {User}