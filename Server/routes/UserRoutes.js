const express = require("express")
const {jwtAuth,generateToken} = require('../jwt.js')
const router = express.Router()
const User = require('../models/UserModel.js')

router.post('/signup',async (req,res)=>{
    try{
        const data = req.body        
        const user = await User.findOne({email:data.email})
        if(user){
            return res.status(400).json({ error: "User with this email already exists" })
        }
        const person = new User(data)
        const response = await person.save()

        const payload = {
            id:response.id,
            role: response.role
        }
        const token = generateToken(payload)
        res.status(200).json({success:true,user:response,token:token})
    }
    catch(err){
        res.status(500).json({ success:false,error: err.message || "Internal Server Error" })
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        
        const user = await User.findOne({email:email})
        if (!user) {
            return res.status(401).json({ success:false,error: "No user Found!" });
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ success:false,error: "Invalid password" });
        }

        const payload = {
            id:user.id,
            role: user.role
        }
        const token = generateToken(payload)

        res.json({success:true,token})
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.get('/profile',jwtAuth,async (req,res)=>{
    try{
        const userData = req.user
        const userId = userData.id;
        const user = await User.findById(userId)

        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.put('/profile/password',jwtAuth, async (req,res)=>{
    try{
        const userId = req.user.id
        const {currPass,newPass} = req.body
        const user = await User.findById(userId)
        if(!await user.comparePassword(currPass)){
            return res.status(401).json({error:"Invalid password"})
        }
        user.password = newPass
        await user.save()


        res.status(200).json({message:"Password Updated"})
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

module.exports = router