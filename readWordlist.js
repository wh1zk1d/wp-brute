const fs = require('fs')
const util = require('util')
const chalk = require('chalk')

const readFile = util.promisify(fs.readFile)

const readWordlist = wordlist => {
  if (wordlist) {
    console.log(chalk.yellow('\n[i] Reading wordlist'))
    return readFile(wordlist)
  } else {
    console.error(chalk.red('[✘] Missing wordlist'))
    process.exit(1)
  }
}

module.exports = readWordlist
