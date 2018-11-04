var express = require('express')
var router = express.Router()
var monk = require('monk')
const url = '127.0.0.1:27017/test'
var db = monk(url)

db.then(() => {
    console.log('Connected correctly to server.')
})

/* GET home page. */
/*router.get('/', function (req, res, next) {
    res.render('index')
})*/

router.get('/', function (req, res, next) {
    var userData = db.get('user-data')
    userData.find({})
        .then(function (docs) {
            res.render('index', { items: docs })
        }).then(() => db.close())
})

router.post('/generate-order', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        price: req.body.price
    }
    var userData = db.get('user-data')
    var insertedItem = userData.insert(item).then(() => {
        db.close()
    })
    res.redirect('/')
})

/*router.post('/insert', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    var userData = db.get('user-data')
    var insertedItem = userData.insert(item).then(() => {
        db.close()
    })
    res.redirect('/')
})*/

/*router.get('/edit/:id', function (req, res) {
    var id = req.params.id
    var userData = db.get('user-data')
    userData.findOne({ _id: id }).then((doc) => {
        res.render('index', { item: doc })
    }).then(() => {
        db.close()
        //res.responseEnd()
    })
})*/

/*router.post('/update', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }
    var id = req.body.id

    var userData = db.get('user-data')
    userData.update({ '_id': id }, item)

        .then(() => {
            db.close()
        })

    userData.find({})
        .then(function (docs) {
            res.render('index', { items: docs })
        })
})*/

router.get('/delete/:id', function (req, res, next) {
    //console.log(req.param)
    const id = req.params.id
    var userData = db.get('user-data')
    userData.remove({ '_id': id })
        .then(result => {
            console.log(`id ${id} has been deleted.`)
        })
        .then(() => {
            db.close()
        })

    userData.find({})
        .then(function (docs) {
            res.render('index', { items: docs })
        }).then(() => db.close())
    //res.redirect('/')
})

module.exports = router
