const mongoose = require('mongoose');
const config = require("config")

module.exports = async function () {
    try {
        await mongoose.connect(config.get("database"));
        console.log("connection done")
    } catch (error) {
        console.log(error)
    }
}