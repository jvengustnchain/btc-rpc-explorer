const http = require('http')

const url = 'http://localhost:8080/'

function getBlockByHash (blockHash) {
  let path = 'getblock/' + blockHash
  console.log('trying to get block from new api!')
  return new Promise((resolve, reject) => {
    http.get(url + path, (resp) => {
      let data = ''
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        var jsonResp = JSON.parse(data)
        resolve(jsonResp)
      })
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
      reject(err)
    })
  })
}

function getBlockByHeight (height) {
  let path = 'getblockbyheight/' + height
  console.log('trying to get blocks by heightfrom new api!')
  return new Promise((resolve, reject) => {
    http.get(url + path, (resp) => {
      let data = ''
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        var jsonResp = JSON.parse(data)
        resolve(jsonResp)
      })
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
      reject(err)
    })
  })
}

function getRawTransaction (txid) {
  console.log('trying to get rawtransaction from new api!')
  return getFromApiServer('gettransaction/' + txid)
}

function getRawTransactions (txids) {
  console.log('trying to get rawtransactions from new api!')
  return getFromApiServer('gettransactions/' + txids)
}

// getBlockByHashWithTransactions

function getFromApiServer (path) {
  return new Promise((resolve, reject) => {
    http.get(url + path, (resp) => {
      let data = ''
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        var jsonResp = JSON.parse(data)
        resolve(jsonResp)
      })
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
      reject(err)
    })
  })
}

module.exports = {
  getBlockByHash: getBlockByHash,
  getBlockByHeight: getBlockByHeight,
  getRawTransaction: getRawTransaction,
  getRawTransactions: getRawTransactions
}
