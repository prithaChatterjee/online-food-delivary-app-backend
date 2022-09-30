const mongoose = require("mongoose")
// import { Categories } from "./categories";

const resturentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categories: {
        type: [new mongoose.Schema({
            rating: {type: Number},
            category: {type: mongoose.Schema.Types.ObjectId, 
                ref: "Categories"
            }
        })],
        minLength: 1,
    }
});

const Resturent = mongoose.model("resturent", resturentSchema)

const getresturents = async function (search) {
    console.log(search)
    const result = await Resturent.find().populate("categories")
    return result
}

const createresturents = async function (body) {
    try {
        const resturent = new Resturent(body); 
        const response = await resturent.save()
        return {code: 200, result: response}
    } catch (error) {
        return {code: 400, result: error}
    }
}

module.exports.createresturent = createresturents
module.exports.getresturents = getresturents 