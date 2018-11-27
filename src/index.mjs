import { CONTRACT_ADDRESS, PRIV_KEY } from './config'

import web3 from './web3'
import Contract from './Contract'
import Storage from './Storage'
import STORAGE_ABI from './contract/STORAGE_ABI'

export const init = (priv) => {

  const contract = new web3.eth.Contract(STORAGE_ABI, CONTRACT_ADDRESS)
  const account = web3.eth.accounts.wallet.add(PRIV_KEY)

  return new Storage(contract, account)
}

export default init
