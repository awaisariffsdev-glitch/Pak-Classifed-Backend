const mongoose=require("mongoose");
require("dotenv").config();

const connectDb=async () => {
    try {
        const DB_URL=process.env.DB_URL;
        await mongoose.connect(DB_URL);
        console.log("DataBase Connected Successfully");
    } catch (error) {
        console.log(error);
        console.log("DataBase Not Connected");
    }
}

module.exports=connectDb;