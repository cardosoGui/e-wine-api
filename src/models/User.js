const DataTypes = require('sequelize')

const types = {
	email: { type: DataTypes.STRING },
	name: { type: DataTypes.STRING },
	nickName: { type: DataTypes.STRING },
	password: { type: DataTypes.STRING },
	isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
}

const labels = {
	email: 'Email',
	name: 'Nome',
	nickName: 'Apelido',
	senha: 'Senha',
	isAdmin: 'Administrador'
}

/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/
const create = (sequelize) => {
	// const User = sequelize.define('user', types)
	const User = sequelize.define('user', types)

	return User
}

create.types = types

create.labels = labels

module.exports = create
