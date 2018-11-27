import ImmutablETH from './src'

const storage = ImmutablETH()

const pony = storage.getItem('myFavoritePony') // Roland

pony.then(console.log)

const order = { item: 'coffee', amount: 1, price: 100, total: 100 }
storage.setItem('order-1234567890', order) // saved!