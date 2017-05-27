const Poll = require('../models').Poll
const Choice = require('../models').Choice

module.exports.postChoice = (req, res, next) => {
  // first check if the user has made a choice already
  // if findOne by PollId and chosenBy is true, then reject post

  Choice.create({
    chosenBy: req.user ? req.user.username : req.ip,
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
}
