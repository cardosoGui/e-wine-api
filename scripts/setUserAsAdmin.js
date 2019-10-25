const yesno = require('yesno')
const passprompt = require('password-prompt')

const log = console.log.bind(console)
const warn = console.warn.bind(console)
const error = console.error.bind(console)

// console.log = () => void 0
// console.warn = () => void 0
// console.error = () => void 0

require('../src/globals')

const e = f => f()

e(async () => {

    await App.Models.init()

    console.log = log
    console.warn = warn
    console.error = error

    const email = process.argv[2]

    let user = await App.Models.user.findOne({ where: { email } })

    if (!user) {
        const ok = await yesno({
            question: `User with email "${email}" not found. Do you wish to create an admin user with this email? (Y/n) `
        })
        if (!ok) { process.exit(1) }
        let password
        do {
            password = await passprompt('Enter a password: ')
            const confirm_password = await passprompt('Confirm the password: ')
            if (password !== confirm_password) {
                log(`Passwords don't match. Try again.\n`)
            }
            else break
        } while (true)
        ({ user } = await App.Services.User.register({ email, password }))
        log(`Admin user with email ${email} has been created.`)
    }

    await user.update({ isAdmin: true })

    log(`User with email "${email}" is now admin.\n`)

    process.exit(0)
})