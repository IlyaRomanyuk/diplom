const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const TOKEN_SECRET_KEY = 'dfhidusfhyiudayfidayfihvkcxvuydsf'

mongoose.connect('mongodb+srv://Ilya:MpBd1942@chats.sbg2t.mongodb.net/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

// Models
const chatsModel = require('./models/chats')
const usersModel = require('./models/users')

// Instance Express
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

//JWT
const checkAuthentication = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ')

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).json({ 'message': 'Пользователь не авторизован (verify)' })
                return
            }

            req.user = decoded

            next()
        })
    } else {
        res.status(403).json({ 'message': 'Пользователь не авторизован' })
    }
}

//Доспуп
app.use('/chats', checkAuthentication)

// корень
app.get('/', (req, res) => {
    res.json({ title: 'You need change path' })
})


//Работа с чатами
app.get('/chats', async (req, res) => {
    const todos = await chatsModel.find({}).lean()
    res.status(200).json(todos)
})

app.get('/chats/:id', async (req, res) => {
    const { id } = req.params
    const chat = await chatsModel.find({ _id: id }).lean()
    res.status(200).json(chat)
})

app.delete('/chats/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: 'Не передан идентификатор чата', id })
        return
    }

    chatsModel.findByIdAndRemove({ _id: id }, (err, doc) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить чат', id })
            return
        }
        res.status(200).json(doc)
    })
})

app.post('/chats', (req, res) => {
    const { title, messages } = req.body
    const newChat = new chatsModel({ title, messages })

    newChat.save((err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось сохранить данные в БД' })
            return
        }
        res.status(200).json(doc)
    })
})


// Работа с сообщениями
app.post('/chats/:id/messages', (req, res) => {
    const { id } = req.params
    const { author, message, image } = req.body

    if (!author || !message) {
        res.status(500).json({ error: 'Не получены все необходимые данные' })
        return
    }

    chatsModel.findOneAndUpdate({ _id: id }, { $push: { messages: { author, message, image } } }, { returnOriginal: false }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось сохранить сообщение в БД' })
            return
        }

        res.status(200).json(doc.messages[doc.messages.length - 1])
    })
})

app.delete('/chats/:chatId/messages/:messageId', (req, res) => {
    const { chatId, messageId } = req.params

    if (!messageId) {
        res.status(500).json({ error: 'Не получен id сообщения' })
        return
    }

    chatsModel.findOneAndUpdate({ _id: chatId }, { $pull: { messages: { _id: messageId } } }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Не удалось сообщение из БД' })
            return
        }
        res.status(200).json(doc)
    })
})

//Регистрация

app.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
        res.status(400).json({ error: 'Введите все обязательные поля' })
        return
    }

    const user = new usersModel({ email, name, password })
    await user.save()
    res.status(201).json(user)
})
// Авторизация

app.post('/auth', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Не передан email или password' })
        return
    }

    const user = await usersModel.findOne({ email })
    if (!user) {
        res.status(401).json({ message: 'Пользователь не найден' })
        return
    }

    if (!user.validatePassword(password)) {
        res.status(401).json({ message: 'Неправильный логин/пароль' })
        return
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    res.status(201).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY)
    })
})

app.listen(3030, () => console.log("server started"))