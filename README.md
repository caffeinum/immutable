# ImmutablETH

**This package is built as a joke and is __not__ intended for real-world use! Depend on it for your own risk!**

ImmutablETH stores your data in the ETH rinkeby blockchain.

```javascript
import ImmutablETH from 'ImmutablETH'

const storage = ImmutablETH()

const pony = storage.getItem('myFavoritePony') // Roland
pony.then(console.log)

const order = { item: 'coffee', amount: 1, price: 100, total: 100 }
storage.setItem(`order-${Date.now()}`, order)
  .then(() => console.log('saved!'))
  .catch(() => console.log('error'))
// saved!

```

## Contribute

Send some tETH to this address: [0x17dA6A8B86578CEC4525945A355E8384025fa5Af](https://rinkeby.etherscan.io/address/0x17dA6A8B86578CEC4525945A355E8384025fa5Af). You can use https://faucet.rinkeby.io/!
