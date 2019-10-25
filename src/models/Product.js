const DataTypes = require("sequelize")

const types = {
	name: { type: DataTypes.STRING },
	filename: { type: DataTypes.STRING },
	description: { type: DataTypes.STRING },
	images: { type: DataTypes.STRING },
	quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
	price: { type: DataTypes.INTEGER, defaultValue: 0 },
	key_word_ids: { type: DataTypes.TEXT },
	ext: { type: DataTypes.STRING }
}

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
const create = sequelize => {
	const Product = sequelize.define("product", types)

	Product.associate = models => {
		Product.belongsToMany(models.category, { through: "product_category" })
	}

	return Product
}

create.types = types

module.exports = create
