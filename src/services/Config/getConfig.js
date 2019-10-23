module.exports = async function getConfig() {

    const config = await App.Models.config.findOne()

    try {
        const configValues = JSON.parse(config.dataValues.value)
        return configValues
    }
    catch (e) {
        const error = new Error()
        error.status = 500
        error.payload = { message: `Ocorreu um erro ao tentar obter a configuração: ${JSON.stringify(e)}` }
        throw error
    }
}