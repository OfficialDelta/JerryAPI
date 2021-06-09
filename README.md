# Jerry API
Public API for all of the main features of the **Jerry the Price Checker** bot

# Usage
The api is hosted on **api.skybrokers.xyz**

Send requests using your favorite method for sending GET requests.

# Available Endpoints
## Scammer
If you're looking on checking a specific user, use the **uuid** query

> api.skybrokers.xyz/scammer?uuid=00617c1e4e214d3ab04dad9d93333dee

OR

> api.skybrokers.xyz/scammer?uuid=00617c1e-4e21-4d3a-b04d-ad9d93333dee
```js
"00617c1e4e214d3ab04dad9d93333dee": {
    "operated_staff": "sadsalt#1010",          // SkyblockZ staff member who added the user to the list
    "reason": "scammed 1.45M",                 // reason the user is on the scammer list
    "uuid": "00617c1e4e214d3ab04dad9d93333dee" // the user's uuid
}
```

If you would like to request the entire SBZ scammer list in JSON format, don't include any queries

> api.skybrokers.xyz/scammer
```json
"01e3082ae31748e293978b02bb270cbe": {
    "operated_staff": "BathTube#1696",
    "reason": "Admitted to scam 2.5m in a dungeon carry.",
    "uuid": "01e3082ae31748e293978b02bb270cbe"
},
"01ed38b3b0cc4764850042baf6b7dbc9": {
    "operated_staff": "knarfie#0001",
    "reason": "Attempte scam of 3.5 mil coins in a hoe backpack trade.",
    "uuid": "01ed38b3b0cc4764850042baf6b7dbc9"
},
"01f291e881514471a12d23e9ef7c0199": {
    "operated_staff": "worryga#7855",
    "reason": "Coop kick scam w/ Mettatone",
    "uuid": "01f291e881514471a12d23e9ef7c0199"
}
```

## Price
For checking the average price of a specific item, specify the item's ID (usually just the item name with underscores replacing spaces) with the **item** query
> api.skybrokers.xyz/price?item=shaman_sword
```js
{
    "ac": true,
    "hi": 620000,          // high end of the average price
    "low": 590000,         // low end of the average price
    "name": "shaman_sword" // item's ID
}
```

To get a list of all of the items, don't include any queries
> api.skybrokers.xyz/price
```json
{
    "ac": true,
    "hi": 150,
    "low": 150,
    "name": "end_sword"
},
{
    "ac": true,
    "hi": 27500000,
    "low": 26000000,
    "name": "wither_artifact"
},
{
    "ac": true,
    "hi": 420000,
    "low": 400000,
    "name": "vampirism_vi"
}
```
