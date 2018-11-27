import Web3 from 'web3'
import { NETWORK, INFURA_KEY } from './config'

const WEB3_PROVIDERS = {
  mainnet: new Web3.providers.HttpProvider(`https://mainnet.infura.io/${INFURA_KEY}`),
  testnet: new Web3.providers.HttpProvider(`https://rinkeby.infura.io/${INFURA_KEY}`),
  localnet: new Web3.providers.HttpProvider(`http://localhost:7545`),
}

export default new Web3(WEB3_PROVIDERS[NETWORK])
