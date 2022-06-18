require ('dotenv').config();
const express = require ('express');
const cors = require ( 'cors');
const mongoose = require ('mongoose')
const connection =require ('./db')
const userRoutes = require('./routes/user');
const authRoutes = require ('./routes/auth');

connection()

const app = express()
app.use(express.json())
app.use(cors())

app.use("api/users",userRoutes);
app.use("api/auth",authRoutes)

const port= process.env.PORT || 8080
app.listen(port,()=>{
`Listening on Port ${port}`
})


