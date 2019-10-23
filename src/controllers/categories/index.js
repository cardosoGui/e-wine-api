const { Router } = require('express')

const app = Router()

app.use('/', App.Core.AuthRoute)

app.get('/', async (req, res) => {

    try {
        const categories = await App.Services.Category.list()
        res.status(200).send(categories)
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

app.post('/', App.Core.AdminRoute, async (req, res) => {

    try {
        const category = await App.Services.User.addCategory(req.body)
        res.status(200).send(category)
    }
    catch (e) {

        res.status(e.status || 500).send(e.payload)
    }
})

app.get('/:id', async (req, res) => {

    try {
        const category = await App.Services.Category.getInfo(req.params.id)
        res.status(200).send(category)
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

app.put('/:id', App.Core.AdminRoute, async (req, res) => {

    try {
        const category = await App.Services.User.editCategory(req.params.id, req.body)
        res.status(200).send(category)
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

app.delete('/:id', App.Core.AdminRoute, async (req, res) => {

    try {
        await App.Services.User.deleteCategory(req.params.id)
        res.status(200).send()
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

module.exports = app