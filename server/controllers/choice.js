const Poll = require('../models').Poll
const Choice = require('../models').Choice

module.exports.postChoice = (req, res, next) => {
  // first check if the user has made a choice already
  // if findOne by PollId and chosenBy is true, then reject post
  const username = req.user ? req.user.username : req.ip
  
  const newChoice = () =>
    Choice.create({
      chosenBy: username,
      text: req.body.text,
      PollId: req.params.pollId,
    })
    .then(() => {
      res.json({
        success: true,
      })
      // return json for dataset???
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err.toString(),
      })
    })

  Choice
    .findOne({ 
      where: {
        PollId: req.params.pollId, 
        chosenBy: username,
      },
    })
    .then((exists) => {
      if (!exists) {
        newChoice()
      } else {
        res.json({
          success: false,
          message: username + ' has already voted on this poll',
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}
