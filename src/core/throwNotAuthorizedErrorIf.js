module.exports = function throwNotAuthorizedErrorIf(conditionToThrow) {
    if (conditionToThrow) {
        const error = new Error()
        error.status = 401
        throw error
    }
}