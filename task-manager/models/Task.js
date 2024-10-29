const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [30, "The task name can't be more the 30 characters"],
    },

    completed:{
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Task', TaskSchema)