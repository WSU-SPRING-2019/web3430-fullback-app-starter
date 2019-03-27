import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
const Schema = mongoose.Schema

let bookSchema = new Schema ({
    title: String,
    poster: String,
    isbn: String,
    author: String,
    synopsis: String
})

let userSchema = new Schema({
    username : {
        type: String,
        unique : true,
        required: true,
        trim: true
    },
    email : {
        type: String,
        unique : true,
        required: true,
        trim: true
    },
    firstName : {
        type: String,
        required: true,
        trim: true
    },
    lastName : {
        type: String,
        required: true,
        trim: true
    },
    hash: String,
    salt: String
})

userSchema.methods.setPassword = function (pwd){
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha12').toString("hex")
}

userSchema.methods.validPassword = function (pwd){
    let h = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha12').toString("hex")

    return h === this.hash
}

userSchema.methods.generateJWT = function (){
    let expiredAfter = new Date()
    expiredAfter.setDate(expiredAfter.getDate() + 5)

    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        exp: parseInt(expiredAfter.getTime() / 1000)
    }, "SHHHHHHHH" )
}

export let Book = mongoose.model("Book", bookSchema)
export let User = mongoose.model("User", userSchema)