test('registers one user', async () => {

    const { status } = await api.post('/auth/register', {
        email: "vfonseca1618@gmail.com",
        name: "Vinicius Fonseca",
        password: '12345678',
    })

    expect(status).toBe(200)
})