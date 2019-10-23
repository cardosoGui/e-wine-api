module.exports = async function edit(id, newInfo) {

    await App.Models.user.update(newInfo, {
        where: { id }
    })

    const user = await App.Models.user.findByPk(id)

    return user
}