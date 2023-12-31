const User=require('../models/User');
const {StatusCodes}=require('http-status-codes')
const bcrypt=require('bcryptjs')
const {BadRequestError}=require('../errors');
const {UnauthenticatedError}=require('../errors')
const jwt=require('jsonwebtoken');

const register=async(req,res)=>{
    const user=await User.create(req.body);
    // console.log('y');
    const token=user.createJWT();
    // console.log('t')
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new BadRequestError('Please provide email and password')
    }
    const user= await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    // console.log('hi');
    const isPasswordCorrect=await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token=user.createJWT();
    res.status(StatusCodes.OK).json(({user:{name:user.name},token}))
}

module.exports={
    register,login
}