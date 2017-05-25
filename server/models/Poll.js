module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    createdBy: DataTypes.STRING,
    title: DataTypes.STRING,
  })

  return Poll
}
