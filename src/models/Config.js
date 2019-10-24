const DataTypes = require('sequelize')

const types = {
    value: { type: DataTypes.TEXT }
}

const labels = {
    value: "Valor"
}

/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/
const create = (sequelize, DataTypes) => {

    const Config = sequelize.define('config', types)

    return Config
}

create.types = types
create.labels = labels

module.exports = create