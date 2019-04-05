import express from 'express'
import { Book } from "../models/schemas"
import { requireLogin } from '../helpers/require_login';
let router = express.Router()

router.get('/api/books', function(req, res, next){
  Book.find().exec((err, books) => {
    if(err){
      res.json({success: false, message: "Failed query"})
    }else{
      res.write(JSON.stringify(books))
      res.end()
    }
  }) 
  
})

router.post('/api/books/create', requireLogin, function(req, res, next){
  new Book(req.body).save(err => {
    if(err){
      res.json({success: false, message: "Unable to save book"})
    }else{
      res.end()
    }
  })
})

router.get('/api/books/:id', function(req, res, next){
  Book.findById(req.params.id, (err, book) => {
    if(err){
      res.json({success: false, message: "Requested book not found"})
    }else{
      res.write(JSON.stringify(book))
      res.end()
    }
  })
})

router.put('/api/books/:id/update', requireLogin, function(req, res, next){
  Book.findById(req.params.id, (err, book) => {
    if(err){
      res.json({success: false, message: "Book not found"})
    }else{
      console.log(req.body)
      Object.assign(book, req.body)
      book.save(err => {
        if(err){
          res.json({success: false, message: "Unable to update book"})
        }else{
          res.end()
        }
      })
    }
  })
})

router.delete('/api/books/:id/delete', requireLogin, function(req, res, next){
  Book.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.json({success: false, message: "Unable to delete book or book is not found"})
    }else{
      res.end()
    }
  })
})
export {router }
