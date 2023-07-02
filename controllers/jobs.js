const Job=require('../models/Job')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,NotFoundError}=require('../errors')


const getAllJobs=async(req,res)=>{
    const createdBy=req.user.userId;
    const jobs=await Job.find({createdBy}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs,count:jobs.length});
}

const getJob=async(req,res)=>{
    const {user:{userId},params:{id:jobId}}=req;
    const job=await Job.findOne({
        _id:jobId,createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobID}`);
    }
    res.status(StatusCodes.OK).json({job});
}
const createJob=async(req,res)=>{
    // console.log('hey');
    req.body.createdBy=req.user.userId
    const job=await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob=async(req,res)=>{
    const {
    body:{company,position},
    user:{userId},
    params:{id:jobId}}=req;
    if(company===''||position==='')
    throw new BadRequestError('Empty Values cannot be empty');

    const job=await Job.findByIdAndUpdate({
        _id:jobId,createdBy:userId
    },req.body,{
        new:true,
        runValidators:true
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobID}`);
    }
    res.status(StatusCodes.OK).json({job});
}
const deleteJob=async(req,res)=>{
    const {user:{userId},params:{id:jobId}}=req;
    const job=await Job.findByIdAndRemove({
        _id:jobId,createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobID}`);
    }
    res.status(StatusCodes.OK);
}

module.exports={
    getAllJobs,getJob,createJob,updateJob,deleteJob
}