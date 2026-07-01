const express =require("express");
const app=express();
const connectDb = require("./config/connectDb");
const morgan = require("morgan");
const authMiddleware = require("./middleware/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const User=require("./models/user.models")
app.use(morgan("dev"));

app.use("/uploads",express.static("uploads"));


app.get("/profile",authMiddleware,async (req,res) => {
    try {
        const {email}=req.body;
        if(!email){
            return res.status(400).json({
                message:"Email Is required"
            })
        };

        const userFind=await User.findOne({email});
        if(!userFind){
            return res.status(400).json({
                message:"Email IS required"
            })
        };

        return res.status(200).json({
            message:"User Find Successfully",
            userFind
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Server Error"
        })
    }
})

app.use("/user",require("./routes/user"));
const PORT =process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server Is Running On http://localhost:${PORT}`);
    connectDb();
})