const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/user", async (req, res)=> {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        })
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

router.post("/user/login", async (req, res)=> {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(400).send("User not found");
        }
        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(200).json(user);
        }else{
            res.status(500).send("Incorrect password");
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;