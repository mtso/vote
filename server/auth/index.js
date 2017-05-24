import passport from 'passport'
import twitterStrategy from './passport-twitter'

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

passport.use(twitterStrategy)

export default passport