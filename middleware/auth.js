const jwt = require("jsonwebtoken");

const authMiddleware=async (req,res,next) => {
    try {
        const authheader=req.headers.authorization;
        if(!authheader){
            return res.status(400).json({
                message:"Token Is required"
            })
        };


        
        const decoded = await jwt.decode(authheader);
        req.User=decoded;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

module.exports=authMiddleware;