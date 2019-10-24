const axios = require('axios')

require('../globals')

beforeAll(async () => {
	/** @type {import('sequelize').QueryInterface} */
	const queryInterface = await App.Models.sequelize.getQueryInterface()

	await queryInterface.dropAllTables()
	await App.Models.init()
})

const baseURL = `http://localhost:${process.env.PORT || 8000}`

global.api = axios.create({ baseURL })
global.withToken = (token) => {
	/** @type {import('axios').AxiosInstance} */
	const api = axios.create({ baseURL })

	api.interceptors.request.use((config) => ({
		...config,
		headers: {
			...config.headers,
			Authorization: `Bearer ${token}`
		}
	}))

	return api
}

function runConsolidatedTests() {
	require('./core/enqueue_op')
	require('./auth/register')
	require('./auth/login')
	require('./auth/me')
	require('./users')
	require('./products')

	require('./categories')
	require('./config')
}

runConsolidatedTests()
