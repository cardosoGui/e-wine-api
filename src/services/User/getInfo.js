module.exports = async function getInfo(id) {

    const user = await App.Models.user.findByPk(id)

    return user
}