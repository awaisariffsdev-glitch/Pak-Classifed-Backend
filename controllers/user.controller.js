const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../util/sendOTP");
const { verifyOTP } = require("../util/verifyOTP");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const requestSignUp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email Is Requried"
            })
        }

        // console.log("Request Body:", req.body);
        // console.log("Email from request:", email);
        const userFind = await User.findOne({ email });
        if (userFind) {
            return res.status(400).json({
                message: "User Already existed"
            })
        }

        const result = await sendOTP(email, "SignUp OTP - Pak Classifed");
        if (!result || !result.success) {
            return res.status(400).json({
                message: "Failed To send OTP"
            })
        }


        return res.status(200).json({
            message: "OTP sent to your email. Please verify to complete signup",
            email
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


const userSignUp = async (req, res) => {
    try {
        const { fullname, email, password, phone, city, otp } = req.body;
        if (!fullname || !email || !password || !otp || !phone || !city) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }

        if (!email.includes('@gmail.com')) {
            return res.status(400).json({
                message: "Invalid Email Format"
            })
        }
        const specialCharaters = /[!@#$%^&*()<>:"{}[\]|\\/?.,;'\-_=+]/;

        if (!specialCharaters.test(password)) {
            return res.status(400).json({
                message: "Password Must Contains Alleast One Special Charater"
            })
        }
        const verification = await verifyOTP(email, otp);
        console.log("Verification Result ", verification)
        if (!verification.success) {
            return res.status(400).json({
                message: verification.message
            });

        }

        const userFind = await User.findOne({ email });
        if (userFind) {
            return res.status(409).json({
                message: "User Is Already Existed"
            })
        }

        const hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
            image: req.file ? req.file.path : null,
            phone,
            city,
            isVerified: true

        })

        await newUser.save();


        return res.status(201).json({
            message: "User Registered Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


const userFind = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id Is Requried"
            })
        }

        const userFindById = await User.findById(id);



        return res.status(200).json({
            message: "User Find Successfully",
            userFindById
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const userUpdate = async (req, res) => {
    try {
        const { email, password, fullnamephone,city } = req.body;
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id is requried"
            })
        }

        const hashPassword = await bcrypt.hash(password, 13);
        const userFindByIdAndUpdate = await User.findByIdAndUpdate(id, {
            email,
            fullname,
            password: hashPassword,
            image: req.file ? req.file.path : null,
            phone,
            city
        });


        return res.status(200).json({
            message: "User Updated Successfully",

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const userDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id Is Requried"
            })
        }


        const userDelete = await User.findByIdAndDelete(id);


        return res.status(200).json({
            message: "User Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


const userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }


        const userFind = await User.findOne({ email });

        if (!userFind) {
            return res.status(400).json({
                message: "User Not Found ,Please SignUp First"
            })
        }


        const isCompare = await bcrypt.compare(password, userFind.password);
        if (!isCompare) {
            return res.status(400).json({
                message: "User Not Found ,Please SignUp First"
            })
        }

        const payload = ({
            fullname: userFind.fullname,
            email,

        });
        const SCRECT_KEY = process.env.SCRECT_KEY;

        const token = await jwt.sign(payload, SCRECT_KEY, { expiresIn: "7d" });


        return res.status(200).json({
            message: "User LogIn Successfully",
            token
        })




    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}



module.exports = { userSignUp, requestSignUp, userLogIn, userFind, userUpdate, userDelete }