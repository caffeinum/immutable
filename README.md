# ImmutablETH

**This package is built as a joke and is __not__ intended for real-world use! Depend on it for your own risk!**

ImmutablETH stores your data in the ETH rinkeby blockchain. 

```javascript
import ImmutablETH from 'ImmutablETH'

const storage = ImmutablETH.init()

const pony = await storage.getItem('myFavoritePony') // Roland

const order = { item: 'coffee', amount: 1, price: 100, total: 100 }
await storage.setItem('order-1234567890', order) // saved!
```
