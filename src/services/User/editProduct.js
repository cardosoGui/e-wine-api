module.exports = async function editProduct(
	id,
	{ name, quantity, price, filename, description, images, categories, key_word_ids }
) {
	await App.Models.product.update(
		{ name, quantity, price, filename, description, images, categories, key_word_ids },
		{ where: { id } }
	)

	const product = await App.Models.product.findByPk(id)

	await product.setCategories(categories)

	product.dataValues.categories = categories

	return product
}
