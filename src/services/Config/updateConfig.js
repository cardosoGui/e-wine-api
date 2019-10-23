module.exports = async function updateConfig(newConfig) {

    const config = await App.Models.config.findOne()

    try {
        const currentConfig = JSON.parse(config.dataValues.value)
        await config.update({
            value: JSON.stringify({
                ...currentConfig,
                ...newConfig
            })
        })
    }
    catch (e) {
        const err = new Error()
        err.status = 500
        err.payload = { message: `Ocorreu um erro ao tentar atualizar a configuração: ${JSON.stringify(e)}` }
        throw err
    }
}