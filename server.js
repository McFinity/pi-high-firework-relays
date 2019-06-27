const path = require('path');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')))
app.get('/index.js', (req, res) => res.sendFile(path.join(__dirname, '/index.js')))

app.post('/detonate', (req, res) => {
    res.send({ detonated: true })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))