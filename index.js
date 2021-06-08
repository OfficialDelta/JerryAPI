const express = require('express')
const { exec } = require('child_process')

let app = express()

app.get('/scammer', (req, res) => {
    let scammerJSON = require('scammer.json')
	if (req.queries.uuid) {
        let uuid = req.queries.uuid
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

app.listen(9000, () => {
	console.log('Scammer API is listening on port 9000')
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