module.exports = async function list() {

    const users = await App.Models.user.findAll({})

    return users
}