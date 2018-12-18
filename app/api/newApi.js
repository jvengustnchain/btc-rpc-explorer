const http = require('http')
var config = require("./../config.js");


function getServiceURL()
{
  return 'http://' + config.apiServers[0].host + ':' + config.apiServers[0].port + '/';
}


function getBlockByHash (blockHash) {
  let path = 'getblock/' + blockHash
  console.log('trying to get block from new api!')
  return new Promise((resolve, reject) => {
    http.get(getServiceURL() + path, (resp) => {
      let data = ''
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        if (data) {
          var jsonResp = JSON.parse(data)
          resolve(jsonResp)
        }
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
    http.get(getServiceURL() + path, (resp) => {
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

function getRawTransaction (txid) {
  console.log('trying to get rawtransaction from new api!')
  return getFromApiServer('gettransaction/' + txid)
}

function getBlockTxIds (blockHash, offset, limit) {
  console.log('trying to get rawtransaction from new api!')
  return getFromApiServer('getblocktxids/' + blockHash +'/'+offset+'/'+limit)
}

function getFromApiServer (path) {
  return new Promise((resolve, reject) => {
    http.get(getServiceURL() + path, (resp) => {
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
  getRawTransactions: getRawTransactions,
  getBlockTxIds: getBlockTxIds
}
