import mongoose from 'mongoose'
import crypto from 'crypto'
import {getSignedAuthenticationToken } from "../helpers/require_login"
const Schema = mongoose.Schema

let bookSchema = new Schema({
  title: String,
  poster: String,
  isbn: String,
  author: String,
  synopsis: String,
})

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
})

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.hash === hash
}

userSchema.methods.generateJwt = function() {
  let expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return getSignedAuthenticationToken(this, expiry)
}

export let Book = mongoose.model("Book", bookSchema)
export let User = mongoose.model("User", userSchema)