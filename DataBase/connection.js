const mongoose = require ('mongoose')
const connectionString  =  process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongo-DB Atlas coonected with Split-PDF Server");
}).catch((error)=>{
    console.log("DataBase Connection failed ERROR:",error);
})