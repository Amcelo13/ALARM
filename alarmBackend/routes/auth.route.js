const router = require('express').Router()
const userSchema = require('../models/user.schema')

router.post('/register' ,async (req , res)=>{
    const {username, password} = req.body
    const user = new userSchema({username, password})
    await user.save()
    return res.status(200).send('User created')
})

router.post('/login' ,async (req , res)=>{
    const {username, password} = req.body
    const user = await userSchema.findOne({username, password})
    if(!user){
        return res.status(400).send('User not found')
    }
    else{
        return res.status(200).json({message:'User not found', id: user._id})
    }
})



module.exports  = router