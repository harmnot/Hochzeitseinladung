require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = 4000

mongoose.connect('mongodb://localhost:27017/weddingInvitation', { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})