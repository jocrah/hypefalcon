'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    recipient: { type: String, required: true },
    text: { type: String, required: true }
},
    { timestamps: true }
)

module.exports = mongoose.model('Kudo', schema)
