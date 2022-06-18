require ('dotenv').config();
const express = require ('express');
const cors = require ( 'cors');
const mongoose = require ('mongoose')
const connection =require ('./db')

connection()

const app = express()
app.use(express.json())
app.use(cors())

const port= process.env.PORT || 8080
app.listen(port,()=>{
`Listening on Port ${port}`
})


