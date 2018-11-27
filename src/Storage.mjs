export default class Storage {
  constructor(contract, account) {
    this.contract = contract
    this.account = account
  }

  setItem(key, obj) {
    const data = JSON.stringify(obj)
    return this.contract.methods.setItem(key, data).send({
      from: this.account.address,
    })
  }

  getItem(key) {
    const data = this.contract.methods.getItem(key).call()

    return data.then(JSON.parse)
  }
}
