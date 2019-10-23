module.exports = async function deletePlan(id) {
    await App.Models.plan.destroy({ where: { id } })
}