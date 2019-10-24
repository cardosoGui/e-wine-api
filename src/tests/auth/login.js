test('performs login', async () => {

    await App.Services.User.register({
        email: "vfonseca1620@gmail.com",
        name: "Vinicius Teste Login",
        password: "12345678"
    })

    const { data, status } = await api.post('/auth/login', {
        email: "vfonseca1620@gmail.com",
        password: "12345678"
    })

    expect(status).toBe(200)
})