const { Router } = require('express')

const app = Router()

app.post('/', async (req, res) => {

    try {
        const result = await App.Services.User.register(req.body)
        res.status(200).send(result)
    }
    catch (e) {
        console.log(e)
        res.status(e.status || 500).send(e.payload)
    }
})

module.exports = app