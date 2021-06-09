const express = require('express')
const https = require('https')

let app = express()
let priceJSON = {}
let scammerJSON = {}


app.get('/scammer', (req, res) => {
    let clientIP =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress
    console.log(`Request to /scammer inbound from ${clientIP} with query ${JSON.stringify(req.query)}`)
    if (req.query.uuid) {
        let uuid = req.query.uuid.split('-').join('').toLowerCase()
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

app.get('/price', (req, res) => {
    let clientIP =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress
    console.log(`Request to /price inbound from ${clientIP} with query ${JSON.stringify(req.query)}`)
    if (req.query.item) {
        let item = req.query.item
        let foundItem = {}
        for (const itemInfo of priceJSON) {
            if (itemInfo.name === item) {
                foundItem = itemInfo
                break
            }
        }
        if (foundItem.name) {
            foundItem.success = true
            res.send(foundItem)
        }
        else {
            res.send({
                success: false,
                reason: 'Inputted item is not a valid item ID.'
            })
        }
    }
    else {
        priceJSON.success = true
        res.send(priceJSON)
    }
})

app.listen(10000, async () => {
    priceJSON = await getSBZData().catch((e) => {
        console.log('failed to get SBZData with error/status code:', e)
    })
    scammerJSON = await getSBZScammers().catch((e) => {
        console.log('failed to get SBZScammers with error/status code:', e)
    })
    console.log('Scammer API is listening on port 10000')
})

setInterval(async () => {
    priceJSON = await getSBZData().catch((e) => {
        console.log('failed to get SBZData with error/status code:', e)
    })
    scammerJSON = await getSBZScammers().catch((e) => {
        console.log('failed to get SBZScammers with error/status code:', e)
    })
}, 60 * 1000)


async function getSBZScammers() {
    return new Promise((resolve, reject) => {
        https.get('https://raw.githubusercontent.com/skyblockz/pricecheckbot/master/scammer.json', res => {
            if (res.statusCode !== 200) {
                return reject(new Error(res.statusCode))
            }

            let data = ''

            res.on('data', chunk => {
                data += chunk.toString()
            })

            res.on('end', () => {
                resolve(JSON.parse(data))
            })
        }).on('error', e => {
            reject(e)
        })
    })
}

async function getSBZData() {
    return new Promise((resolve, reject) => {
        https.get('https://raw.githubusercontent.com/skyblockz/pricecheckbot/master/data.json', res => {
            if (res.statusCode !== 200) {
                return reject(new Error(res.statusCode))
            }

            let data = ''

            res.on('data', chunk => {
                data += chunk.toString()
            })

            res.on('end', () => {
                resolve(JSON.parse(data))
            })
        }).on('error', e => {
            reject(e)
        })
    })
}