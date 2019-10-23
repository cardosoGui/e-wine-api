const { Router } = require('express')

const app = Router()

app.use('/', App.Core.AuthRoute)

app.get('/', async (req, res) => {

    try {
        const users = await App.Services.User.list()
        res.status(200).send(users)
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

app.put('/:id', async (req, res) => {

    try {
        const user = await App.Services.User.edit(req.params.id, req.body)
        res.status(200).send(user)
    }
    catch(e) {
        console.log(e)
        res.status(e.status || 500).send(e.payload)
    }
})

app.delete('/:id', async (req, res) => {

    try {
        await App.Services.User.remove(req.params.id)
        res.status(200).send()
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

app.get('/me', async (req, res) => {
    res.status(200).send(req.user)
})

module.exports = app