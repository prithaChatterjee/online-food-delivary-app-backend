const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', CartSchema);

const getcart = async function (id) {
    const result = await Cart.find().find({
        user: id
    })
    return result[0]
}

const createCart = async function (body) {
    if (body._id) {
        const result = await Cart.findById(body._id)
        console.log(result)
        // const findcart = result[0]
        // console.log(body)
        // findcart.subTotal = body.subTotal
        // console.log(findcart)
    } else {
        try {
            const cart = new Cart(body);
            const response = await cart.save()
            return { code: 200, result: response }
        } catch (error) {
            return { code: 400, result: error }
        }
    }
}

const updateCart = async function (body) {
    const result = await Cart.find().find({user})
    return result[0]
    // try {
    //     const cart = new Cart(body);
    //     const response = await cart.save()
    //     return { code: 200, result: response }
    // } catch (error) {
    //     return { code: 400, result: error }
    // }
}

module.exports.createCart = createCart
module.exports.getcart = getcart 