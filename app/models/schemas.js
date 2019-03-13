import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let bookSchema = new Schema ({
    title: String,
    poster: String,
    isbn: String,
    author: String,
    synopsis: String
})

export let Book = mongoose.model("Book", bookSchema)