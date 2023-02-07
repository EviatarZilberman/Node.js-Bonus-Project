const mongoose = require('mongoose');

let LegoSchema = new mongoose.Schema(
    {
        id: Number,
        year: Number,
        amountOfBricks: Number,
        price: Number,
    },
    {
        strict:false
    }
)

const Lego = mongoose.model("LegoSchema",LegoSchema);

module.exports = Lego;