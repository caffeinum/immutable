export default class Storage {
  constructor(contract, account) {
    this.contract = contract
    this.account = account
  }

  async setItem(key, obj) {
    const data = JSON.stringify(obj) || ""

    const gas = await this.contract.methods.setItem(key, data).estimateGas()

    return this.contract.methods.setItem(key, data).send({
      from: this.account.address,
      gas: 3e6,
    })
  }

  async getItem(key) {
    const data = this.contract.methods.getItem(key).call()

    return data.then(JSON.parse).catch(() => ({}))
  }
}
