const { Op } = require('sequelize')

module.exports = async function list(filters) {
	const include = []
	const where = {}

	include.push({
		model: App.Models.category,
		as: 'categories',
		separate: false,
		attributes: [ 'id' ],
		duplicating: false
	})
	if (filters.categories) {
		where[`$categories.id$`] = {
			[Op.in]: filters.categories.split(',').map(Number).filter(Boolean)
		}
	}

	const products = await App.Models.product.findAll({
		include,
		where,
		order: [ [ 'id', 'DESC' ], [ 'name', 'ASC' ] ]
	})
	products.forEach((product) => {
		product.dataValues.categories = (product.dataValues.categories || []).map(({ id }) => id).join() || ''
	})

	return products
}
