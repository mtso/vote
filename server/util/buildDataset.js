const buildDataset = (req) => (poll) => {
  poll = poll.get({
    plain: true,
  })

  const Choices = poll.Choices
  delete poll.Choices

  Choices.push({
    PollId: 1,
    chosenBy: 'fakeuser',
    text: 'Piccard',
  })

  poll.isChosen = Choices
    .map((c) => c.chosenBy)
    .some((u) => {
      if (u) {
        return (req.user && u === req.user.username) 
          || u === req.ip
      }
    })

  poll.choices = Object.keys(
    Choices
      .reduce((acc, choice) => {
        acc[choice.text] = choice.text
        return acc
      }, {})
  )

  if (poll.isChosen) {
    const bucket = Choices
      .reduce((acc, choice) => {
        if (choice.chosenBy) {
          acc[choice.text] = acc[choice] + 1 || 1
        }
        return acc
      }, {})

    const labels = Object.keys(bucket)

    const data = {
      datasets: [ 
        {
          data: labels.map((l) => bucket[l]),
        },
      ],
      labels,
    }

    poll.data = data
  }

  return poll
}

export default buildDataset