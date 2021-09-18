const dotenv = require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

const cities = [
    "ניצני עוז"
    , "ניצנים"
    , "ניר אליהו"
    , "ניר בנים"
    , "ניר גלים"
    , "ניר דוד )תל עמל("
    , 'ניר ח"ן'
    , "ניר יפה"
    , "ניר יצחק"
    , "ניר ישראל"
    , "ניר משה"
    , "ניר עוז"
    , "ניר עם"
    , "ניר עציון"
    , "ניר עקיבא"
    , "ניר צבי"
    , "נירים"
    , "נירית"
    , "נירן"
    , "נמרוד"
    , "נס הרים"
    , "נס עמים"
]
app.get('/', (req, res) => {
    console.log(cities)
    res.send(cities)
})

app.post('/search', (req, res) => {
    const { city, street, num } = req.body
    res.send('1234')
})


console.log(path.join(__dirname, '../client'))

app.use(express.static(path.join(__dirname, './client')))



const PORT = process.env.PORT || 4001
server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})