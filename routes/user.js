const router = require("express").Router();
const User = require("../models/User");
const verifyJWTToken = require("./verifyJWTToken");

// router.get("/user", (req, res)=>{
//     console.log("/user endpoint")
//     res.send("user working");
// })

//UPDATE
router.put("/user", verifyJWTToken, async (req, res)=> {
    try{
        const user = await User.findByIdAndUpdate(
            req.user.id, //pass in id
            {$set: req.body}, //data bto be inserted
            {new: true} //return updated copy
        )
        const {password, ...others} = user._doc;
        res.status(200).json({...others});
    }catch(error){
        res.status(404).json(error);
    }
})


module.exports = router;