module.exports.callback = (passport) => [
  passport.authenticate('twitter', {failureRedirect: '/'}),
  (req, res) => res.redirect('/')
]
