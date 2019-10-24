const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { Router } = require('express')

const stat = promisify(fs.stat.bind(fs))
const readFile = promisify(fs.readFile.bind(fs))
const writeFile = promisify(fs.writeFile.bind(fs))

const app = Router()

app.get('/public/:id/images', async (req, res) => {
	const productId = req.params.id

	const product = await App.Models.product.findByPk(productId)

	const imagePath = product.dataValues.image

	const fullPath = path.join(__dirname, '..', '..', '..', 'storage', imagePath)

	let image

	try {
		image = await readFile(fullPath)
	} catch (e) {
		try {
			const result = await App.enqueueOperation(() => App.Storage.filesDownload({ path: `images/${imagePath}` }))
			await writeFile(fullPath, result.fileBinary)
			image = result.fileBinary
		} catch (e) {
			res.status(404).send()
		}
	}

	res.status(200).send(image)
})

module.exports = app
