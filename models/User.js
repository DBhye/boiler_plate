const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//salt가 몇글자인지 설정
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    role: {
        type:Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save',function( next ){
    var user = this;

    if(user.isModified('password')) {
//password를 변경할때만 실행되도록 조건문
//저장하기 전에 function을 한다.
//비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            //스키마의 user.password를 가져오고, salt, 암호화된 비밀번호(hash)를 완성한다.                       
            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err)
                user.password = hash //들어있던 비밀번호를 hash된 비밀번호로 바꾼다.
                next()
            });
        });
    }
});

const User = mongoose.model('User',userSchema)

module.exports = {User}