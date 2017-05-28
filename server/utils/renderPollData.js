export const buildDataset = (choices) => {
  const count = choices
    .reduce((acc, choice) => {
      if (choice.chosenBy) {
        acc[choice.text] = acc[choice.text] + 1 || 1
      }
      return acc
    }, {})

  const labels = Object.keys(count)

  return {
    datasets: [ 
      {
        data: labels.map((l) => count[l]),
      },
    ],
    labels,
  }
}

const renderPollData = (req) => (poll) => {
  poll = poll.get({
    plain: true,
  })

  const Choices = poll.Choices
  delete poll.Choices

  poll.isChosen = Choices
    .map((c) => c.chosenBy)
    .some((u) => {
      if (u) {
        return (req.user && u === req.user.username) 
          || (!req.user && u === req.ip)
      }
    })

  if (poll.isChosen) {
    poll.data = buildDataset(Choices)
  } else {
    poll.choices = Object.keys(
      Choices
        .reduce((acc, choice) => {
          acc[choice.text] = choice.text
          return acc
        }, {})
    )
  }

  return poll
}

export default renderPollData
