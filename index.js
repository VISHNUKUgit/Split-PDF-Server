
// Loads .env file contents into process.env by default
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes/routes')
require('./DataBase/connection')
 
// Create server
const server = express()

server.use(cors())
server.use(express.json())
// establish connection between router and server
server.use(router)

server.use('/files',express.static('./files'))
server.use('/modified_files',express.static('./modified_files'))
const PORT = 4000 || process.env.PORT

server.listen(PORT,()=>{
    console.log(`Split-PDF Server is Live at port:${PORT} and waiting for client request`);
})

server.get('/',(request,response)=>{
    response.send(`<h1>Split-PDF Server is  Started running at Port number ${PORT}</h1>`)
})