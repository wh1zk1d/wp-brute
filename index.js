const logo = require('asciiart-logo')
const config = require('./package.json')
const inquirer = require('inquirer')
const chalk = require('chalk')

const readWordlist = require('./readWordlist')
const attack = require('./attack')

const userInput = [
  {
    type: 'input',
    name: 'url',
    message: 'Target URL:'
  },
  {
    type: 'input',
    name: 'username',
    message: 'Username:'
  },
  {
    type: 'input',
    name: 'wordlist',
    message: 'Path to wordlist:',
    default: 'wordlist.txt'
  }
]

console.log(logo(config).render())

inquirer.prompt(userInput).then(input => {
  readWordlist(input.wordlist).then(passwords => {
    console.log(chalk.green('[✓] Wordlist is ready'))
    attack(input.url, input.username, passwords)
  })
})
