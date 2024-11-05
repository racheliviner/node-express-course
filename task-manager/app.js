const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./mongoDB/connect.js')
require('dotenv').config()

// Middleware to log incoming requests 
app.use((req, res, next) => { console.log(`Request received for ${req.url}`); next(); });

//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks)
app.use((req,res)=>res.status(404).send('Route does not exist'))

//start the server
const port = process.env.PORT || 3000

async function start(){
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))     
    } catch (error) {
        console.log("Error connecting to the DB:", error);
    }
}

start()

