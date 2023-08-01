const router = require("express").Router();
const User = require("../models/User");

router.get("/user", (req, res)=>{
    console.log("/user endpoint")
    res.send("user working");
})

router.post("/user", async (req, res)=> {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    })

    try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

router.put("/user/:id", async (req, res)=> {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.params.id}, //search by
            req.body, //data bto be inserted
            {new: true} //return updated copy
        )
        res.status(200).json(user);
    }catch(error){
        res.status(404).json(error);
    }
})


module.exports = router;