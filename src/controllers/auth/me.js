const { Router } = require('express')

const app = Router()

app.use('/', App.Core.AuthRoute)

app.get('/', async (req, res) => {

    res.status(200).send(req.user)
})

app.get('/admin', App.Core.AdminRoute, async (req, res) => {

    res.status(200).send(req.user)
})

app.get('/me', App.Core.PartnerRoute, async (req, res) => {
    
})

module.exports = app