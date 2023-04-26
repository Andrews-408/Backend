const fs = require('fs')
const superagent = require('superagent')


const readFileFunc = file =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, 'utf-8',(err, data)=>{
            if(err) reject('Could not read that file')
            resolve(data)
        })
    })
}

const writeFileFunc = (file, data) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err=>{
            if(err) reject('Could not write to that file')
            resolve('success')
        })
    })
}

const getDogPic = async () => {
    try{
        const data = await readFileFunc('./files/input.txt');
        console.log(data)

        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        
        const all = await Promise.all([res1, res2, res3])
        const imgs = all.map(element=> element.body.message)
    
        await writeFileFunc('./files/dog-image.txt', imgs.join('\n'))
        console.log('Random dog image saved to file')
    }
    catch(error){
        console.log(error)
        throw(error)
    }
}

getDogPic()