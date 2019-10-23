module.exports = async function remove(id) {

    await App.Models.user.destroy({ where: { id } })

}