const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    author: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, required: true }
})

const chatsSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, default: 'src/img/mans/bot.png' },
    messages: [messageSchema],
})

module.exports = mongoose.model('Tasks', chatsSchema, 'tasks')