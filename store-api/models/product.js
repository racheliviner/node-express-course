const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, "The product name can't be more the 20 characters"],
    },
    price:{
        type: Number,
        required: [true, 'Must provide price'],
    },
    featured:{
        type: Boolean,
        default: false,
    },
    rating:{
        type: Number,
        default: 3,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    company:{
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported company'
        }
    }
})

module.exports = mongoose.model('Product', ProductSchema)