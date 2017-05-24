import { Strategy as TwitterStrategy } from 'passport-twitter'

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_HOST + '/auth/twitter/callback',
  },
  (token, tokenSecret, profile, done) => {
    done(null, { username: profile.username })
  }
)

export default twitterStrategy