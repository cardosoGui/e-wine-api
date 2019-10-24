describe('config methods', () => {

    let userApi

    beforeAll(async () => {
        const { token } = await App.Services.User.createAdmin({
            email: 'config@example.com',
            name: 'Config User',
            password: '1234'
        })
        userApi = withToken(token)
    })

    it('get config', async () => {

        const { data: config } = await userApi.get('/config')

        expect(typeof config).toBe('object')
        expect(typeof config.banner).toBe('object')
        
        expect(config.banner).toHaveProperty('image_url')
        expect(config.banner).toHaveProperty('title')
        expect(config.banner).toHaveProperty('description')
        expect(config.banner).toHaveProperty('link')
    })

    it('update config', async () => {

        const updatedConfig = {
            banner: {
                image_url: "http://example.com/banner.png",
                title: "Example Title",
                description: "Example Description",
                link: "http://example.com/external_link.html"
            }
        }

        const { status } = await userApi.put('/config', updatedConfig)

        expect(status).toBe(200)

        const { data: config } = await userApi.get('/config')

        expect(typeof config.banner).toBe('object')

        for (const key in updatedConfig.banner) {
            expect(config.banner[key]).toBe(updatedConfig.banner[key])
        }
    })
})