const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const models = [
  require('./Choice'),
  require('./Poll'),
]

const db = {}

models.forEach((model) => {
  model = model(sequelize, Sequelize)
  db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
