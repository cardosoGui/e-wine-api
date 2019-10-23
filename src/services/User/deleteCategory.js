module.exports = async function deleteCategory(id) {
    await App.Models.category.destroy({ where: { id } })
}