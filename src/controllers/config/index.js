const { Router } = require('express')

const app = Router()

app.use('/', App.Core.AuthRoute)

app.get('/', async (req, res) => {
    try {
        const config = await App.Services.Config.getConfig()
        res.status(200).send(config)
    }
    catch (e) {
        console.log(e)
        res.status(e.status || 500).send(e.payload)
    }
})

app.put('/', App.Core.AdminRoute, async (req, res) => {
    try {
        await App.Services.Config.updateConfig(req.body)
        res.status(200).send()
    }
    catch (e) {
        res.status(e.status || 500).send(e.payload)
    }
})

module.exports = app