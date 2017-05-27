const Poll = require('../models').Poll
const Choice = require('../models').Choice

module.exports.postPoll = (req, res, next) => {
  const title = req.body.title
  const choices = req.body.choices

  Poll.create({
    createdBy: req.user.username,
    title,
  })
  .then((poll) => {

    let initialChoices = choices.map((choice) => {
      return {
        chosenBy: null,
        text: choice,
        PollId: poll.id,
      }
    })
    Choice.bulkCreate(
      initialChoices,
      {
        include: [ Poll ]
      })
      .then(() => {
        res.json({
          success: true,
        })
      })
      .catch((err) => next(err))
    
  })
  .catch((err) => next(err))
}

module.exports.getPoll = (req, res, next) => {
  Poll.findById(req.query.id, { include: [ Choice ] })
    .then((poll) => res.json(poll))
    .catch((err) => next(err))
}
