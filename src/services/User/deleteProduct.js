module.exports = async function deleteProduct(id) {
	const product = await App.Models.product.findByPk(id)

	// await App.enqueueOperation(() =>
	// 	App.Storage.filesDelete({
	// 		path: `images/${product.dataValues.filename}`
	// 	})
	// )
	await App.Models.product.destroy({ where: { id } })
}
