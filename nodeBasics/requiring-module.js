
// module.exports
const C = require('./requiring-module2');
const calc1 = new C();
console.log(calc1.add(2,9))

//exports
const calc2 = require('./requiring-module3');
const {add, multiply, divide} = require('./requiring-module3');
console.log(multiply(2,9))