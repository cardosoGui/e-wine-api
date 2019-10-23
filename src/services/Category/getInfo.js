module.exports = async function getInfo(id) {
    const category = await App.Models.category.findByPk(id)

    return category
}