module.exports = async function editArticle(id, { title, thumbnailUrl, content, premium, publication_date }) {
	await App.Models.article.update({ title, thumbnailUrl, content, premium, publication_date }, { where: { id } })

	const article = await App.Models.article.findByPk(id)

	return article
}
