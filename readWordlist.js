const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

const readWordlist = wordlist => {
  if (wordlist) {
    console.log('\n[i] Reading wordlist')
    return readFile(wordlist)
  } else {
    console.error('[✘] Missing wordlist')
    process.exit(1)
  }
}

module.exports = readWordlist
