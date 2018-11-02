const Web3 = require('web3')
const fs = require('fs')
const BigNumber = require('bignumber.js')
const targetBlockHeight = 6630000

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'))

getAddresses = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./addresses.csv', function read(err, body) {
      if (err) {
        reject(err)
      }
      resolve(body.toString().split('\r\n'))
    })
  })
}

getLuckyOne = async () => {
  let addresses = await getAddresses()
  let length = addresses.length
  try {
    let block = await web3.eth.getBlock(targetBlockHeight)
    let blockHashHex = block.hash
    blockHashHex = new BigNumber(blockHashHex)
    let luckyIndex = blockHashHex.modulo(length)
    luckyIndex = parseInt(luckyIndex)
    let luckyOne = addresses[luckyIndex]
    console.log('0.5 ETH is belongs to: ' + luckyOne)
  } catch (e) {
    let blockNumber = await web3.eth.blockNumber
    console.log(`The target block height is at ${targetBlockHeight}`)
    console.log(`It is only ${blockNumber} blocks for now, Please wait for ${15 * (parseInt(targetBlockHeight) - parseInt(blockNumber))} seconds`)
  }
}

// execute the script at block height 6630012
getLuckyOne()
