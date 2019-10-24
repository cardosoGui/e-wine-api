const { Router } = require('express')

const app = Router()

app.get('/', (_, res) => {
	res.status(200).send('STATUS OK')
})

app.get('/ping', (_, res) => res.status(200).send('pong'))

module.exports = app
