const { Router } = require("express")

const app = Router()

app.post("/", async (req, res) => {
	try {
		const result = await App.Services.User.authenticate(
			req.body.email,
			req.body.password
		)
		res.status(200).send(result)
	} catch (e) {
		console.log(e)
		res.status(e.status || 500).send(e.payload)
	}
})

app.post("/admin", async (req, res) => {
	try {
		const result = await App.Services.User.authenticate(
			req.body.email,
			req.body.password,
			true
		)
		res.status(200).send(result)
	} catch (e) {
		console.log(e)
		res.status(e.status || 500).send(e.payload)
	}
})

// app.post("/client", async (req, res) => {
// 	try {
// 		console.log({ body: req.body })
// 		const result = await App.Services.Partner.authenticate(
// 			req.body.email,
// 			req.body.password
// 		)
// 		res.status(200).send(result)
// 	} catch (e) {
// 		res.status(e.status || 500).send(e.payload)
// 	}
// })

module.exports = app
