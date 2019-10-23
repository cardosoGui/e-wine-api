module.exports = async function editCategory(id, { name, sub_category, key_words }) {
	await App.Models.category.update({ name, sub_category, key_words }, { where: { id } })

	const category = await App.Models.category.findByPk(id)

	return category
}
