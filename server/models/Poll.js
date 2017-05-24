const Choice = require('./Choice')

module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    createdBy: DataTypes.STRING,
    title: DataTypes.STRING,
  })

  Poll.hasMany(Choice)

  return Poll
}
