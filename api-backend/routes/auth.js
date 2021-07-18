const router = require("express").Router();
const User = require('../models/User')
const bcyrpt = require('bcrypt')

//Register
router.post("/register", async (req,res)=>{
    try{
        //generate password in bcrypt
        const salt = await bcyrpt.genSalt(10);
        const hashedpass = await bcyrpt.hash(req.body.password, salt)
        //creating user
        const user = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpass,
        });
        //save user and return json format
         const data = await user.save()
         res.status(200).json(data)
    }catch (err){
        res.status(500).json(err)
    }   
});

router.post('/login',async (req ,res)=>{
    try{
       const user = await User.findOne({email:req.body.email} )
       !user && res.status(404).json("user not found")

       const validpassword = await bcyrpt.compare(req.body.password,user.password)
       !validpassword && res.status(400).json("password incorrect")

       res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports =  router;