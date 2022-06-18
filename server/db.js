const mongoose = require ('mongoose');

module.exports = ()=>{
    const connectionParms = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB, connectionParms)
        console.log("Connected to database")
    }catch(error){console.log("Could not connect to database");console.log(error)}
}