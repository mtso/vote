const Poll = require('../models').Poll
const Choice = require('../models').Choice
import renderPollData from '../utils/renderPollData'

module.exports.postPoll = (req, res, next) => {
  const title = req.body.title
  const choices = req.body.choices

  Poll.create({
    createdBy: req.user.username,
    title,
  })
  .then((pollModel) => {

    let initialChoices = choices.map((choice) => {
      return {
        chosenBy: null,
        text: choice,
        PollId: pollModel.id,
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
          poll: Object.assign(
            {},
            req.body,
            {id: pollModel.id},
          )
        })
      })
      .catch((err) => next(err))
    
  })
  .catch((err) => next(err))
}

module.exports.getPoll = (req, res, next) => {
  Poll.findById(req.params.pollId, { include: [ Choice ] })
    .then((poll) => 
      res.json( renderPollData(req)(poll) )
    )
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