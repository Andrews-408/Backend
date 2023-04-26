const fs = require('fs')
const server = require('http').createServer();

server.on('request', (req,res)=>{

    // solution 1
    // fs.readFile('./files/input.txt', 'utf-8',(err, data) =>{
    //     if(err) console.log(err)
    //     res.end(data)
    // })

    //solution 2: streams
    // const readable = fs.createReadStream('./files/api.json');

    // readable.on('data', chunk=>{
    //     res.write(chunk)
    // })

    // readable.on('end', ()=>{
    //     res.end()
    // })

    // readable.on('error', err=>{
    //     console.log(err)
    //     res.statusCode = 500;
    //     res.end('File not Found')
    // })

    //solution 3: pipe
    const readable = fs.createReadStream('./files/api.json');
    readable.pipe(res)
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('waiting for request...')
})