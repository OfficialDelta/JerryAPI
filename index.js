const express = require('express')
const { exec } = require('child_process')

let app = express()

app.get('/scammer', (req, res) => {
    let clientIP =
            req.headers['cf-connecting-ip'] ||
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress
    console.log(`Request to /scammer/ inbound from ${clientIP} with query ${req.query}`)
    let scammerJSON = require('scammer.json')
	if (req.query.uuid) {
        let uuid = req.query.uuid
        if (uuid.includes('-')) {
            let filtered = ''
            for (let i = 0; i < uuid.length; i++) {
                if (uuid[i] === '-') {
                    continue
                }
                else {
                    filtered += uuid[i]
                }
            }
            uuid = filtered
        }
        if (scammerJSON[uuid]) {
            scammerJSON[uuid].success = true
            res.send(scammerJSON[uuid])
        }
        else {
            res.send({
                success: true,
                scammer: false
            })
        }
    }
    else {
        scammerJSON.success = true
        res.send(scammerJSON)
    }
})

app.listen(10000, () => {
	console.log('Scammer API is listening on port 10000')
})

setInterval(() => {
    exec('curl -L -O raw.githubusercontent.com/skyblockz/pricecheckbot/master/scammer.json', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
}, 60*1000)
