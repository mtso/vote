const Poll = require('../models').Poll
const Choice = require('../models').Choice
import renderPollData from '../util/renderPollData'

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
          poll: req.body,
        })
      })
      .catch((err) => next(err))
    
  })
  .catch((err) => next(err))
}

module.exports.getPoll = (req, res, next) => {
  Poll.findById(req.params.pollId, { include: [ Choice ] })
    .then((poll) => res.json(poll))
    .catch((err) => next(err))
}

module.exports.getPolls = (req, res, next) => {
  const renderResult = (polls) => {
    polls = polls.map( renderPollData(req) )
    
    res.json(polls)
  }

  Poll
    .findAll({
      offset: 0,
      limit: 10,
      order: [ [ 'id', 'DESC' ] ],
      include: [ Choice ],
    })
    .then(renderResult)
    .catch((err) => console.error(err))
}