module.exports = async function getInfo(id) {
	const product = await App.Models.product.findByPk(id)

	const categories = await product.getCategories()

	product.dataValues.categories = categories.map((c) => c.dataValues.id)

	return product
}
