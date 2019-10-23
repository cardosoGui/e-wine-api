module.exports = async function deleteArticle(id) {
	await App.Models.article.destroy({ where: { id } })
}
