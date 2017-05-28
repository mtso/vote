class Account {
  constructor() {
  }
  initialize({ username, ip }) {
    this._username = username
    this._ip = ip
  }
  get id() {
    return this.isLoggedIn()
      ? this._username
      : this._ip
  }
  get isLoggedIn() {
    return !!this._username
  }
}

const account = new Account()

export default account
