const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

describe('products crud', () => {
	/** @type {import('axios').AxiosInstance} */
	let userApi

	beforeAll(async () => {
		const { token } = await App.Services.User.createAdmin({
			email: 'product@creator.com',
			password: '1234'
		})

		userApi = withToken(token)
	})

	it(
		'product create',
		async () => {
			const imageUri = path.join(__dirname, 'sample_thumbnail.png')

			const categories = await Promise.all([
				await App.Services.User.addCategory({ name: 'Categoria 1' }),
				await App.Services.User.addCategory({ name: 'Categoria 2' })
			])

			const categoriesIds = categories.map((c) => c.dataValues.id)

			const formData = new FormData()

			formData.append('filename', 'sample_product.mp4')
			formData.append('name', 'Produto de Exemplo')
			formData.append('description', 'Descrição do Vídeo')
			formData.append('images', fs.createReadStream(imageUri))
			formData.append('quantity', 20)
			formData.append('price', 0)
			formData.append('categories', categoriesIds.toString())
			formData.append('key_word_ids', '1,2,3')

			const { data, status } = await userApi.post('/products', formData, {
				headers: formData.getHeaders()
			})

			expect(status).toBe(200)
			expect(data).toHaveProperty('id')
			expect(data.categories).toEqual(categoriesIds)

			const { data: newProduct } = await userApi.get(`/products/${data.id}`)

			expect(newProduct).toHaveProperty('id')
			expect(newProduct.categories).toEqual(categoriesIds)
		},
		10000
	)

	it('product listing', async () => {
		const { data, status } = await userApi.get('/products')

		expect(Array.isArray(data)).toBe(true)
		expect(status).toBe(200)
	})

	it(
		'product update',
		async () => {
			const imageUri = path.join(__dirname, 'sample_thumbnail.png')

			const categories = await Promise.all([
				await App.Services.User.addCategory({ name: 'Categoria 1' }),
				await App.Services.User.addCategory({ name: 'Categoria 2' })
			])

			const categoriesIds = categories.map((c) => c.dataValues.id)

			const formData = new FormData()

			formData.append('filename', 'sample_product.mp4')
			formData.append('name', 'Produto de Exemplo')
			formData.append('description', 'Descrição do Vídeo')
			formData.append('images', fs.createReadStream(imageUri))
			formData.append('quantity', 20)
			formData.append('price', 0)
			formData.append('categories', categoriesIds.toString())
			formData.append('key_word_ids', '1,2,3')

			const { data } = await userApi.post('/products', formData, {
				headers: formData.getHeaders()
			})

			const productId = data.id

			const nextCategories = await Promise.all([
				App.Services.User.addCategory({ name: 'Categoria Z' }),
				App.Services.User.addCategory({ name: 'Categoria W' })
			])

			const nextCategoriesIds = nextCategories.map((c) => c.dataValues.id)

			const newProductData = {
				name: 'updatedProductTitle',
				description: 'updatedProductDesc',
				categories: nextCategoriesIds
			}

			const { data: updatedProduct, status } = await userApi.put(`/products/${productId}`, newProductData)

			expect(status).toBe(200)

			for (const key in newProductData) {
				expect(newProductData[key]).toEqual(updatedProduct[key])
			}

			const qs = {
				categories: [ nextCategoriesIds[0] ].toString()
			}

			const { data: products } = await userApi.get(`/products`, { params: qs })
			expect(products.length).toBe(1)
		},
		10000
	)

	it(
		'product delete',
		async () => {
			const imageUri = path.join(__dirname, 'sample_thumbnail.png')

			const categories = await Promise.all([
				await App.Services.User.addCategory({ name: 'Categoria 1' }),
				await App.Services.User.addCategory({ name: 'Categoria 2' })
			])

			const categoriesIds = categories.map((c) => c.dataValues.id)

			const formData = new FormData()

			formData.append('filename', 'sample_product.mp4')
			formData.append('name', 'Produto de Exemplo')
			formData.append('description', 'Descrição do Vídeo')
			formData.append('images', fs.createReadStream(imageUri))
			formData.append('quantity', 20)
			formData.append('price', 0)
			formData.append('categories', categoriesIds.toString())
			formData.append('key_word_ids', '1,2,3')

			const { data } = await userApi.post('/products', formData, {
				headers: formData.getHeaders()
			})

			const { status } = await userApi.delete(`/products/${data.id}`)

			expect(status).toBe(200)

			const notExistentProduct = await App.Models.product.findByPk(data.id)

			expect(notExistentProduct).toBe(null)
		},
		8000
	)
})
