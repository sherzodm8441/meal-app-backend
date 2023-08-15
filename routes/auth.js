const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/user", async (req, res)=> {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        })
        const savedUser = await newUser.save();
        const { password, ...others} = savedUser._doc
        res.status(201).json(others);
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
            const accessToken = jwt.sign(
                { id: user._id }, 
                process.env.JWT_SECRET_KEY, 
                {expiresIn: "1h"}
            );
            const { password, ...others} = user._doc;
            res.status(200).json({...others, accessToken});
        }else{
            res.status(500).send("Incorrect password");
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;