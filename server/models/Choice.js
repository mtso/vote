module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define('Choice', {
    chosenBy: DataTypes.STRING,
    text: DataTypes.STRING,
  })

  return Choice
}
