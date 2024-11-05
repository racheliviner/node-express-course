const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const JobSchema = require('../models/Job')

const getAllJobs = async (req, res) => {
    res.send ('get all jobs')
}

const getJob = async (req, res) => {
    res.send ('get job')
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await JobSchema.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    res.send ('update job')
}

const deleteJob = async (req, res) => {
    res.send ('delete job')
}

module.exports =  {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}