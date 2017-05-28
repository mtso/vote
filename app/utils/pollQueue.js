class PollQueue {
  constructor() {
    this.queue = []
    this.push = this.push.bind(this)
    this.pop = this.pop.bind(this)
    this.log = this.log.bind(this)
  }
  push(poll, cb) {
    this.queue.push(poll)
    cb()
  }
  pop() {
    return this.queue.pop()
  }
  log() {
    console.log(this.queue)
  }
}

const pollQueue = new PollQueue()

export default pollQueue
