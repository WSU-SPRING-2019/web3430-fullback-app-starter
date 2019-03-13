import express from 'express'
let router = express.Router()

/* GET / */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Index page', content: "index", errors: {}, user: {}})
})

router.get('/about', function(req, res, next) {
  res.render('layout', { title: 'About page', content: "index", errors: {}, user: {}})
})

router.get('/contact', function(req, res, next) {
  res.render('layout', { title: 'Contact us', content: "contact", errors: {}, user: {}})
})

export {router }

