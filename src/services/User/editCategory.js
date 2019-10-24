module.exports = async function editCategory(id, { name, key_words }) {
	await App.Models.category.update({ name, key_words }, { where: { id } })

	const category = await App.Models.category.findByPk(id)

	return category
}
