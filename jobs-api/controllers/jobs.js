const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const JobSchema = require('../models/Job')

const getAllJobs = async (req, res) => {
    const jobs = await JobSchema.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: jobs.length, jobs})
}

const getJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}} = req
    const job = await JobSchema.findOne({_id: jobId, createdBy: userId})
    if (!job){
        throw new NotFoundError(`No job with ${jobId} found...`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await JobSchema.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    const {body: {company, position}, user: {userId}, params: {id: jobId}} = req
    if(company==='' || position===''){
        throw new BadRequestError('Most provide company and position')
    }
    const job = await JobSchema.findOneAndUpdate(
        {_id: jobId, createdBy: userId},
        req.body,
        {new: true, runValidators:true}
    )
    if (!job){
        throw new NotFoundError(`No job with ${jobId} found...`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}} = req
    const job = await JobSchema.findOneAndDelete({_id: jobId, createdBy: userId})
    if (!job){
        throw new NotFoundError(`No job with ${jobId} found...`)
    }
    res.status(StatusCodes.OK).send('Job has deleted')
}

module.exports =  {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}