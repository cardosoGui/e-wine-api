const jwt = require('jsonwebtoken')
const JWT_SECRET = "medita_123456789"

const JWT = {
    sign(payload) {
        return jwt.sign(payload, JWT_SECRET)
    },
    decode(token) {
        return jwt.verify(token, JWT_SECRET)
    }
}

module.exports = JWT