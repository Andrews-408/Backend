const fs = require('fs')
const crypto = require('crypto')

setTimeout(() => console.log('Timer 1 finished'),0);
setImmediate(()=>console.log('Immediate 1 finished'))

fs.readFile('./files/input.txt', 'utf-8',(err, data)=>{
    console.log("I/O finished")
    console.log('---------------')
    setTimeout(() => console.log('Timer 2 finished'),0);
    setTimeout(() => console.log('Timer 3 finished'),3000);
    setImmediate(()=>console.log('Immediate 2 finished'))

    process.nextTick(()=> console.log('Process.nextTick'))

}
)

console.log('Hello from the top level code')