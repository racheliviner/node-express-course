const notFoundMiddleware = require('./middleware/not-found')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const path = require('path');
const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/api/v1/products', productsRouter);

// products route
app.use(notFoundMiddleware)

//start the server
const port = process.env.PORT || 3000

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))      
    } catch (error) {
        console.log(error)
    }
}

start()