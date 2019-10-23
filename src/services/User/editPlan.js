module.exports = async function editPlan(id, planInfo) {

    await App.Models.plan.update(planInfo, { where: { id } })

    const plan = await App.Models.plan.findByPk(id)

    return plan
}