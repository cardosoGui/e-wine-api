test('gets user info', async () => {

    const { token } = await App.Services.User.register({
        email: "vfonseca16181@gmail.com",
        password: "1234"
    })

    const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })

    expect(typeof data).toBe("object")

})