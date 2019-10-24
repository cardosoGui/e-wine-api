const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile.bind(fs))

/**
 * @param {*} productInfo
 * @param {File} fileDescriptor
 * @param {File} thumbnailDescriptor
 * @param { "ADMIN" | "PARTNER" } mode
 * @param {object} opts
 */

module.exports = async function addProduct(
	{ name, quantity, price, filename, description, images, categories = '', key_word_ids },
	fileDescriptor
) {
	const ext = filename.split('.').pop()

	let resolvedFileName = ''

	console.log(fileDescriptor)

	try {
		;[ resolvedFileName ] = fileDescriptor.path.match(/[^\\\/:*?\"<>|]+$/)
		if (!resolvedFileName) throw new Error()
	} catch (e) {
		const err = new Error()
		err.status = 400
		err.payload = { message: 'Nome da inválida.' }
	}
	categories = categories.split(',').map(Number).filter(Boolean)

	const product = await App.Models.product.create(
		{
			name,
			quantity,
			filename: resolvedFileName,
			description,
			price,
			images,
			categories,
			key_word_ids,
			ext
		}

		// {
		//	fazer carrinho por este modelo
		// 	include: [
		// 		{
		// 			model: App.Models.partner
		// 		}
		// 	]
		// }
	)
	await product.setCategories(categories)

	const contents = await readFile(fileDescriptor.path)

	// await App.enqueueOperation(async () => {
	// 	await Promise.all([
	// 		App.Storage
	// 			.filesUpload({
	// 				path: `images/${resolvedFileName}`,
	// 				contents
	// 			})
	// 			.then((res) => console.log(res))
	// 			.catch((e) => console.log({ e }))
	// 	])
	// })

	product.dataValues.categories = categories

	return product
}
