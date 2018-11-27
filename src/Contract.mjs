// (c) caffeinum 2018

export default class Contract {
  constructor(web3, address, abi) {
    this.isContract = true
    this.address = address
    this.contract = new web3.eth.Contract(abi, address)

    if (!this.contract)
      throw new Error(`Cant init contract`, address)
  }

  static async deploy(web3, abi, { data, value, from }, ...params) {
    const Factory = new web3.eth.Contract(abi);

    const deploy = Factory.deploy({ data, arguments: params }).encodeABI();

    const nonce = await web3.eth.getTransactionCount(from, 'pending')

    let transactionObject = {
      from,
      nonce,
      value,
      data: deploy,
    };

    console.log('tx object', transactionObject)

    const estimateGas = await web3.eth.estimateGas(transactionObject)

    transactionObject.gas = estimateGas

    console.log('estimateGas', estimateGas)

    const signedTx = await web3.eth.accounts.signTransaction(transactionObject, wallet.account.privateKey)

    const tx = web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    tx.on('transactionHash', hash => console.log('tx hash', hash))

    const receipt = await tx

    console.log('tx receipt', receipt)

    const address = receipt.contractAddress

    console.log('Contract mined! address: ' + address + ' transactionHash: ' + receipt.transactionHash);

    return new Contract(web3, address, abi);
  }

  call(method, ...params) {
    const _method = this.contract.methods[method]
    if (!_method) throw new Error(`No such method: ${method} at contract ${this.address}`)

    console.log(`Calling .${method} with (${params.join(', ')})`)

    return _method(...params).call()
  }

  async send(method, from, ...params) {
    const _method = this.contract.methods[method]
    if (!_method) throw new Error(`No such method: ${method} at contract ${this.address}`)

    console.log(`Calling .${method} with (${params.join(', ')})`)

    console.log('method', _method)

    const estimatedGas = await _method(...params).estimateGas({
      from,
    })

    console.log('send estimatedGas', estimatedGas)

    return _method(...params).send({
      from,
      gasLimit: estimatedGas || 1e5
    })
    .on('transactionHash', hash => console.log('tx hash', hash))
    .then(receipt => {
      console.log('tx receipt', receipt)
      return receipt
    })
  }

  events(eventName) {
    return new Promise((resolve, reject) => {
      this.contract.getPastEvents(eventName, { fromBlock: 0, toBlock: 'latest' }, (error, events) => {
        if (error)
          return reject(new Error(`Event ${eventName}: Error in handler: ${error}`))

        resolve(events)
      })
    })
  }
}
