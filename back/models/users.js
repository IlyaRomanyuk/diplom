const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const SALT_ROUNDS = 10

const usersSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },
})

usersSchema.pre('save', function (next) {
    this.image = `src/img/mans/m${Math.floor(1 + Math.random() * (6 + 1 - 1))}.png`
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

usersSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Users', usersSchema, 'users')