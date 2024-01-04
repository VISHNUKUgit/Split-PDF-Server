
// Loads .env file contents into process.env by default
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');

// Import custom router and database connection
const router = require('./routes/routes')
require('./DataBase/connection')
 
// Create an Express server instance
const server = express()

// Enable Cross-Origin Resource Sharing (CORS)
server.use(cors())

// Parse incoming JSON requests
server.use(express.json())

// establish connection between router and server
server.use(router)

// Serve static files from 'files' and 'modified_files' directories
server.use('/files',express.static('./files'))
server.use('/modified_files',express.static('./modified_files'))

// Define the port for the server to listen on
const PORT = 4000 || process.env.PORT

// Start the server and listen for incoming requests
server.listen(PORT,()=>{
    console.log(`Split-PDF Server is Live at port:${PORT} and waiting for client request`);
})

// Define a simple route to check if the server is running
server.get('/',(request,response)=>{
    response.send(`<h1>Split-PDF Server is  Started running at Port number ${PORT}</h1>`)
})