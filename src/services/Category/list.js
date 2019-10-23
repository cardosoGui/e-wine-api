module.exports = async function list() {
    const categories = await App.Models.category.findAll({})

    return categories
}