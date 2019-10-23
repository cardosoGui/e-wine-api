const bcrypt = require('bcrypt')

module.exports = async function authenticate(email, password, isAdmin) {

    const user = await App.Models.user.findOne({
        where: { email }
    })
    
    App.Core.throwNotAuthorizedErrorIf(!user)
    App.Core.throwNotAuthorizedErrorIf(isAdmin && !user.dataValues.isAdmin)

    const authorized = await bcrypt.compare(password, user.dataValues.password)

    console.log({ password, authorized })

    App.Core.throwNotAuthorizedErrorIf(!authorized)

    const token = App.Core.JWT.sign({ id: user.dataValues.id })

    return { user, token }
}