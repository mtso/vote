module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    createdBy: DataTypes.STRING,
    title: DataTypes.STRING,
  }, {
    timestamps: false,
    classMethods: {
      associate: (models) => Poll.hasMany(models.Choice),
    },
  })

  return Poll
}
