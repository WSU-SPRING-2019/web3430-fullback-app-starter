import express from 'express'
import { Book } from "../models/schemas"
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

router.get('/api/books/:id', function(req, res, next){
  res.json({success: false, message: "Not implemented yet"})
})

router.post('/api/books/create', function(req, res, next){
  res.json({success: false, message: "Not implemented yet"})
})

router.put('/api/books/:id/update', function(req, res, next){
  res.json({success: false, message: "Not implemented yet"})
})

router.delete('/api/books/:id/delete', function(req, res, next){
  res.json({success: false, message: "Not implemented yet"})
})
export {router }
