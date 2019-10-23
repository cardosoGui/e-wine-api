const bcrypt = require('bcrypt')

module.exports = async function register(userInfo) {
	const emailCount = await App.Models.user.count({ where: { email: userInfo.email } })

	if (emailCount > 0) {
		const err = new Error()
		err.status = 409
		err.payload = { message: 'E-mail já existe.' }
		throw err
	}

	const password = await bcrypt.hash(userInfo.password, App.Models.salt)

	const user = await App.Models.user.create({
		email: userInfo.email,
		name: userInfo.name,
		nickName: userInfo.nickName,
		password
	})

	const token = App.Core.JWT.sign({ id: user.dataValues.id })

	return { user, token }
}
