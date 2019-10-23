module.exports = async function addProduct({
	content,
	name,
	thumbnailUrl,
	categories = "",
	key_word_ids
}) {
	const product = await App.Models.product.create(
		{
			content,
			name,
			thumbnailUrl,
			categories,
			key_word_ids
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

	// if (authorId) {
	// 	App.Models.partner.findByPk(authorId).then(partner => {
	// 		if (partner) {
	// 			product.setPartner(partner)
	// 		}
	// 	})
	// }

	return product
}
