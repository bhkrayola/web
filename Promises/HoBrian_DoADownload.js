
let https = require('https')
function readNewPromise(url){
  return new Promise((resolve) => {
    https.get(url, (response) => {
      let aggregatedResponseString = '';
    
      response.on('data', (chunk) => {
          aggregatedResponseString += chunk;
      });
      response.on('end', () => {
          let data = JSON.parse(aggregatedResponseString)
          resolve(data)
      });
    });
  });
}

async function main(url) {
  const data = await readNewPromise(url)
  console.log(data)
  return data
}


main('https://geocoding.geo.census.gov/geocoder/locations/address?street=6560+Braddock+Road&city=Alexandria&state=VA&benchmark=2020&format=json')

//Brian Ho, Kosek Pd 1, 2023
