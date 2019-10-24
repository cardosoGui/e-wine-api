const DataTypes = require('sequelize')

const types = {
	name: { type: DataTypes.STRING },
	key_words: { type: DataTypes.STRING }
}

const labels = {
	name: 'Nome',

	key_words: 'Palavra Chave'
}

/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/
const create = (sequelize, DataTypes) => {
	const Category = sequelize.define('category', types)

	Category.associate = (models) => {
		Category.belongsToMany(models.product, { through: 'product_category' })
	}

	return Category
}

create.types = types
create.labels = labels

module.exports = create
