const fs = require('fs')
const superagent = require('superagent')


// promises and async await
const readFileFunc = file => {
    return new Promise((resolve, reject)=>{
        fs.readFile(file, 'utf-8',(err, data)=>{
            if(err) reject('Could not find file');
            resolve(data)
        })
    })
}

const writeFileFunc = (file, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err=>{
            if(err){ 
                return reject('Could not read file')
            }
            resolve('success')
        })
    })
}

readFileFunc('./files/input.txt').then(data=>{
        console.log(data)
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res=>{
        console.log(res.body.message)
        return writeFileFunc('./files/dog-image.txt', res.body.message)
    })
    .then(()=>{
                console.log('Random dog image saved to file')
    })
    .catch(err=>{
            console.log(err.message)
        })
        
    
    



    

    
