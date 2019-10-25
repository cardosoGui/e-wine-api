const fs = require('fs')
const path = require('path')
/** @type {"GET" | "POST" | "PUT"} */
const method = process.argv[2]
const modelPath = process.argv[3]
const DataTypes = require('sequelize')

if (!method || !modelPath) {
    console.log('usage: node scripts/generateReactContainer {GET|POST} {path/to/model}')
    process.exit(0)
}

switch (method) {
    case "GET": generateListContainer(); break
    case "POST": generateFormContainer(); break
    case "PUT": generateFormContainer(); break
}

function generateListContainer() {
    const $modelsReg = /\$model/ig

    const template = fs.readFileSync(path.join(__dirname, 'containers', 'ListContainer.js')).toString()

    const output = template.replace($modelsReg, match => {
        const up = modelPath.split(path.sep).pop().split('.').shift()
        const low = up.toLowerCase()
        switch (match) {
            case '$Model': return up
            case '$model': return low
        }
        return match
    })

    console.log(output)

}

function generateFormContainer() {

    const subReg = /\$\w+/ig

    const template = fs.readFileSync(path.join(__dirname, 'containers', 'FormContainer.js')).toString()

    const model = require(`../${modelPath}`)

    const output = template.replace(subReg, match => {
        const up = modelPath.split(path.sep).pop().split('.').shift()
        const low = up.toLowerCase()

        // console.log(model.types.name.type === DataTypes.STRING)

        switch (match) {
            case '$types':
                const types = {}
                for (const [key, type] of Object.entries(model.types)) {
                    switch (type) {
                        case DataTypes.STRING:
                        default:
                            types[key] = "TEXT"
                    }
                }
                return JSON.stringify(types, null, 4)
            case '$ModelFormContainer':
                return `${up}FormContainer`
            case '$fields':
                return Object.keys(model.types).map(
                    key => `${key}: ""`
                ).join(',\n' + ' '.repeat(8))
            case '$method':
                return method
            case '$methodL':
                return method.toLocaleLowerCase()
            case '$models':
                return `${low}s`
            case '$iterateFields':
                return Object.keys(model.types).map(
                    key => `{ createField("${key}") }`
                ).join('\n' + ' '.repeat(16))
        }

        // console.log(match)
    })

    console.log(output)
}