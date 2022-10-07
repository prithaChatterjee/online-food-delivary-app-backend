const express = require('express')
const router = express.Router()
const {createCart, getcart} = require("../Models/cart")
const asyncMiddleware = require("../Middleware/asyncMiddleware")

router.get('/:_id' , asyncMiddleware(async function (req, res) {
    // console.log(req.params)
    // console.log(req.query.search)
    const result = await getcart({[req.query.search]: req.params._id})
    res.status(200).send(result)
}))

router.post('/', asyncMiddleware(async function (req, res) {
    const { code, result } = await createCart(req.body)
    res.status(code).send(result)
}))

module.exports = router