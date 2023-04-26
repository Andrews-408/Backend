const http = require('http')
const url = require('url')
const fs = require('fs')
const slugify = require('slugify')
// reading a json file
const data = fs.readFileSync(`${__dirname}/files/api.json`)
const dataObject = JSON.parse(data)

//console.log(slugify('Hello', {lower: true}))

// creating a server
const server = http.createServer((req,res)=>{
    const pathname = req.url;
    if(pathname==='/overview' || pathname==='/'){
        res.end('This is the overview')
    }
    else if(pathname==='/product'){
        res.end('This is the product')
    }
    else if(pathname==='/api'){
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(data)
    }
    else{
        res.writeHead(404, {
            'content-type': 'text/html',

        })
        res.end('<h1>Page not found</h1>')
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('listening to request on port 8000')
})
