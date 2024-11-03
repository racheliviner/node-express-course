require('dotenv').config()

const connectDB = require('./db/connect')
const ProductSchema = require('./models/product')

const jsonPreparedProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await ProductSchema.deleteMany()
    await ProductSchema.create(jsonPreparedProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()