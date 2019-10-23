const bcrypt = require('bcrypt')

module.exports = async function createAdmin({ email, password }) {

    const cryptedPassword = await bcrypt.hash(password, App.Models.salt)

    const user = await App.Models.user.create({ email, password: cryptedPassword, isAdmin: true })

    const token = App.Core.JWT.sign({ id: user.dataValues.id })

    return { user, token }
}