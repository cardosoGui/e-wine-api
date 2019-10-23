module.exports = function cleanObject(obj) {
    const fnReturn = {}
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== "" && !Object.is(obj[key], NaN)) {
            fnReturn[key] = obj[key]
        }
    }
    return fnReturn
}