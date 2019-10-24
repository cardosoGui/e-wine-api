module.exports = async function addCategory({ name, key_words }) {
	if (!name) {
		const err = new Error()
		err.status = 400
		err.payload = { message: 'Nome de categoria inválido.' }
		throw err
	}

	const category = await App.Models.category.create({ name, key_words })

	return category
}
