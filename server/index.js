import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import passport from './auth'
import appController from './controllers/app'
const models = require('./models')
const pollController = require('./controllers/poll')
const choiceController = require('./controllers/choice')
const passportTwitterController = require('./controllers/passport-twitter')
const ensureAuthenticated = require('./utils/ensureAuthenticated')

const app = Express()
const port = process.env.PORT || 3750

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(Express.static(path.resolve(__dirname, '..', 'dist')))

app.get('/auth/twitter/callback', passportTwitterController.callback(passport))
app.get('/auth/twitter', passport.authenticate('twitter'))

app.post('/api/poll', ensureAuthenticated, pollController.postPoll)
app.get('/api/poll/:pollId', pollController.getPoll)
app.get('/api/polls', pollController.getPolls)
app.post('/api/choice/:pollId', choiceController.postChoice)

app.get('/*', appController)

models.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log('listening on', port))
  })
  .catch((err) => console.log(err))
