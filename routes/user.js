const router = require("express").Router();
const User = require("../models/User");

router.get("/user", (req, res)=>{
    console.log("/user endpoint")
    res.send("user working");
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