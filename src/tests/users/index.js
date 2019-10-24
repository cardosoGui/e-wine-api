describe('users crud', () => {
	/** @type {import('axios').AxiosInstance} */
	let userApi
	let userInstance

	beforeAll(async () => {
		const { token, user } = await App.Services.User.register({
			email: 'vfonseca2000@gmail.com',
			name: 'viniciu',
			nickName: 'vini',
			password: 'admin@1234'
		})

		userInstance = user
		userApi = withToken(token)
	})

	it('user listing', async () => {
		const { data } = await userApi.get('/users')

		expect(Array.isArray(data)).toBe(true)
	})

	it('user update', async () => {
		const newData = { name: 'Abiloaldo' }

		const { data } = await userApi.put(`/users/${userInstance.dataValues.id}`, newData)

		expect(data.name).toBe(newData.name)
	})

	it('user delete', async () => {
		const { status } = await userApi.delete(`/users/${userInstance.dataValues.id}`)

		expect(status).toBe(200)
	})
})
