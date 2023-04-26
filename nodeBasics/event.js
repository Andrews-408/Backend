const EventEmitter = require('events')

const myEmitter = new EventEmitter()

myEmitter.on('newSale', ()=>{
    console.log('There was a new sale')
})

myEmitter.on('newSale',()=>{
    console.log('customer name, Jonas')
})

myEmitter.on('newSale', stock=>{
    console.log(`There are ${stock} items left in stock.`)
})

myEmitter.emit('newSale', 20)