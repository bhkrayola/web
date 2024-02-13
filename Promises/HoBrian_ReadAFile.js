
const fs = require('fs')
function readNewPromise(filename){
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    });
  });
}

async function main(filename) {
  const data = await readNewPromise(filename)
  console.log(data)
  return data
}


main('foo.txt')

//Brian Ho, Kosek Pd 1, 2023
