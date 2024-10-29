function getAllTasks(req, res){
    res.send('Get all tasks')
}

function createNewTask(req, res){
    res.json(req.body)
}

function getSingleTask(req, res){
    res.json({id: req.params.id})
}

function updateTask(req, res){
    res.send('Update Task')
}

function deleteTask(req, res){
    res.send('Delete task')
}


module.exports = {
    getAllTasks, createNewTask, getSingleTask, updateTask, deleteTask
}