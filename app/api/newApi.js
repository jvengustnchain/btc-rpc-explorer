const http = require('http')
var rp = require('request-promise')
var config = require('./../config.js')

function getServiceURL () {
  return 'http://' + config.apiServers[0].host + ':' + config.apiServers[0].port + '/'
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
        if (data && data.length > 0) {
          var jsonResp = JSON.parse(data)
          resolve(jsonResp)
        } else {
          resolve(null)
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
        if (data && data.length > 0) {
          var jsonResp = JSON.parse(data)
          resolve(jsonResp)
        } else {
          resolve(null)
        }
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
  return postToApiServer('gettransactions2', {txids: txids})
}

function getBlocksByHeight (heights) {
  console.log('trying to get blocksbyHeight from new api!')
  return postToApiServer('getblocksbyheight', {heights: heights})

}

function getBlocksByHash (hashes) {
  console.log('trying to get blocks from new api!')
  return postToApiServer('getblocks', {hashes: hashes}).then(blocks)
}


// getBlockByHashWithTransactions
function getBlockTxIds (blockHash, offset, limit) {
  console.log('trying to get blockTxids from new api!')
  return getFromApiServer('getblocktxids/' + blockHash + '/' + offset + '/' + limit)
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
        if (data && data.length > 0) {
          try {
            var jsonResp = JSON.parse(data)
            resolve(jsonResp)
          } catch (error) {
            console.error('Error parsing data: ' + data)
            console.error('Error parsing data for path: ' + path)
            resolve(null)
          }
        } else {
          resolve(null)
        }
      })
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
      reject(err)
    })
  })
}

function postToApiServer (path, jsonString) {
  console.log('postToApiServer', getServiceURL() + path)
  var options = {
    method: 'POST',
    uri: getServiceURL() + path,
    body: jsonString,
    json: true // Automatically stringifies the body to JSON
  }

  return rp(options)
}




module.exports = {
  getBlockByHash: getBlockByHash,
  getBlocksByHash:getBlocksByHash,
  getBlockByHeight: getBlockByHeight,
  getBlocksByHeight: getBlocksByHeight,
  getRawTransaction: getRawTransaction,
  getRawTransactions: getRawTransactions,
  getBlockTxIds: getBlockTxIds
}
