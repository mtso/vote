module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define('Choice', {
    chosenBy: DataTypes.STRING,
    text: DataTypes.STRING,
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => Choice.belongsTo(models.Poll),
    },
  })

  return Choice
}
