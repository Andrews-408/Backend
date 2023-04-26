const fs = require('fs')
// non-blocking, asynchronous way

fs.readFile('./files/input.txt', 'utf-8', (err, data)=>{
    console.log(data)
    fs.writeFile('./files/output.txt', data,'utf-8', err=>{
        console.log('Your file has been written')
    })
 })
 console.log('Reading files')



 

