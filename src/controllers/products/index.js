const { Router } = require('express')

const app = Router()

app.get('/', App.Core.AuthRoute, async (req, res) => {
	try {
		console.log(req.query)
		const products = await App.Services.Product.list(App.Core.cleanObject(req.query))
		res.status(200).send(products)
	} catch (e) {
		console.log(e)

		res.status(e.status || 500).send(e.payload)
	}
})

app.post('/', App.Core.AuthRoute, App.Core.AdminRoute, App.Core.FormDataRoute, async (req, res) => {
	try {
		const Product = await App.Services.User.addProduct(req.fields, req.files.images)
		res.status(200).send(Product)
	} catch (e) {
		res.status(e.status || 500).send(e.payload)
	}
})

app.get('/:id', App.Core.AuthRoute, async (req, res) => {
	try {
		const Product = await App.Services.Product.getInfo(req.params.id)
		res.status(200).send(Product)
	} catch (e) {
		res.status(e.status || 500).send(e.payload)
	}
})

app.put('/:id', App.Core.AuthRoute, App.Core.AdminRoute, async (req, res) => {
	try {
		const Product = await App.Services.User.editProduct(req.params.id, req.body)
		res.status(200).send(Product)
	} catch (e) {
		console.log(e)

		res.status(e.status || 500).send(e.payload)
	}
})

app.delete('/:id', App.Core.AuthRoute, App.Core.AdminRoute, async (req, res) => {
	try {
		await App.Services.User.deleteProduct(req.params.id)
		res.status(200).send()
	} catch (e) {
		res.status(e.status || 500).send(e.payload)
	}
})

module.exports = app
