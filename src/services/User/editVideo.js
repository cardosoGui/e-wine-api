module.exports = async function editVideo(id, { title, description, categories, premium, publication_date }) {
	await App.Models.video.update({ title, description, premium, publication_date }, { where: { id } })

	const video = await App.Models.video.findByPk(id)

	await video.setCategories(categories)

	video.dataValues.categories = categories

	return video
}
