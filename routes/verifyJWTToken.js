const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const authHeader = req.headers.token;

    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if(error){
                res.status(401).send("Token not valid.")
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).send("Authentication failed. Provide valid token.");
    }
}

module.exports = verifyToken;