describe('categories crud', () => {
	let userApi

	beforeAll(async () => {
		const { token } = await App.Services.User.createAdmin({
			email: 'category@manager.com',
			password: '1234'
		})
		userApi = withToken(token)
	})

	it('category create', async () => {
		const { data, status } = await userApi.post('/categories', { name: 'Geral', sub_category: 'Meditações' })

		expect(data).toHaveProperty('id')
		expect(data).toHaveProperty('name')
		expect(status).toBe(200)
	})

	it('category list', async () => {
		const { data, status } = await userApi.get('/categories')

		expect(Array.isArray(data)).toBe(true)
		expect(status).toBe(200)
	})

	it('category update', async () => {
		const category = await App.Services.User.addCategory({ name: 'newCategory', sub_category: 'NewMeditações' })

		const updatedCategoryValues = { name: 'updatedCategory' }

		const { data, status } = await userApi.put(`/categories/${category.dataValues.id}`, updatedCategoryValues)

		expect(status).toBe(200)
		for (const key in updatedCategoryValues) {
			expect(updatedCategoryValues[key]).toBe(data[key])
		}
	})

	it('category delete', async () => {
		const category = await App.Services.User.addCategory({
			name: 'trashCategory',
			sub_category: 'tessteremove'
		})

		const { status } = await userApi.delete(`/categories/${category.dataValues.id}`)

		expect(status).toBe(200)

		const nonExistentCategory = await App.Models.category.findByPk(category.dataValues.id)
		expect(nonExistentCategory).toBe(null)
	})
})
