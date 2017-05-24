const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const Choice = require('./Choice')(sequelize, Sequelize)
const Poll = require('./Poll')(sequelize, Sequelize)

Choice.belongsTo(Poll)
Poll.hasMany(Choice)

module.exports.sequelize = sequelize
module.exports.Choice = Choice
module.exports.Poll = Poll
