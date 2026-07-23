const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const disposableDomains = require("disposable-email-domains");
require("dotenv").config();




// const userSignUp = async (req, res) => {
//     try {
//         const { fullname, email, password, phone, city, otp } = req.body;
//         if (!fullname || !email || !password || !phone || !city) {
//             return res.status(400).json({
//                 message: "All Fields Are Required"
//             })
//         }

//         if (!email.includes('@gmail.com')) {
//             return res.status(400).json({
//                 message: "Invalid Email Format"
//             })
//         }
//         const specialCharaters = /[!@#$%^&*()<>:"{}[\]|\\/?.,;'\-_=+]/;

//         if (!specialCharaters.test(password)) {
//             return res.status(400).json({
//                 message: "Password Must Contains Alleast One Special Charater"
//             })
//         }
//         // const verification = await verifyOTP(email, otp);
//         // console.log("Verification Result ", verification)
//         // if (!verification.success) {
//         //     return res.status(400).json({
//         //         message: verification.message
//         //     });

//         // }

//         const userFind = await User.findOne({ email });
//         if (userFind) {
//             return res.status(409).json({
//                 message: "User Is Already Existed"
//             })
//         }

//         const result = await sendOTP(email, "SignUp OTP - Pak Classifed");
//         if (!result || !result.success) {
//             return res.status(400).json({
//                 message: "Failed To send OTP"
//             })
//         }
//         return res.status(200).json({
//             message: "OTP sent to your email. Please verify to complete signup",
//             email
//         })
//         const hashPassword = await bcrypt.hash(password, 13);

//         const newUser = new User({
//             fullname,
//             email,
//             password: hashPassword,
//             image: req.file ? req.file.path : null,
//             phone,
//             city,
//             isVerified: true

//         })

//         await newUser.save();


//         return res.status(201).json({
//             message: "User Registered Successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Server Error"
//         })
//     }
// }

const userSignUp = async (req, res) => {
    try {
        const { fullname, email, password, phone, city } = req.body;

        if (!fullname || !email || !password || !phone || !city) {
            return res.status(400).json({
                message: "All Fields Are Required"
            });
        }

        if (!email.includes('@gmail.com')) {
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        }

        const specialCharaters = /[!@#$%^&*()<>:"{}[\]|\\/?.,;'\-_=+]/;
        if (!specialCharaters.test(password)) {
            return res.status(400).json({
                message: "Password Must Contain At Least One Special Character"
            });
        }

        const userFind = await User.findOne({ email });
        if (userFind) {
            return res.status(409).json({
                message: "User Already Exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
            image: req.file ? req.file.path : null,
            phone,
            city,
            isVerified: false   // ✅ not verified yet
        });

        await newUser.save();

        // ✅ send OTP after creating the account
        // const result =  sendOTP(email, "SignUp OTP - Pak Classifed");
        // if (!result || !result.success) {
        //     return res.status(400).json({
        //         message: "User Created But Failed To Send OTP"
        //     });
        // }

        return res.status(201).json({
            message: "User Registered. OTP sent to your email. Please verify to activate your account",
            email
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};





const userFind = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log("Received ID:", id);
        // console.log("Connected DB:", mongoose.connection.name); // ADDED: confirms which database this query is actually hitting
        // console.log("Collection:", User.collection.name);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id Is Requried"
            })
        }

        const userFindById = await User.findById(id);
        // console.log("Found user:", userFindById);



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
        const { email, password, fullname, phone, city } = req.body;
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id is required"
            });
        }

        const updateFields = {
            fullname,
            email,
            phone,
            city,
        };

        // Only hash + include password if the user actually submitted a new one
        if (password && password.trim()) {
            updateFields.password = await bcrypt.hash(password, 13);
        }

        // Only touch image if a new file was actually uploaded
        if (req.file) {
            updateFields.image = req.file.path;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User Updated Successfully",
            user: updatedUser   // key renamed to match what the frontend reads: result.user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

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
            token,
            user: {
                id: userFind._id,
                fullname: userFind.fullname,
                email: userFind.email,
                image: userFind.image,
                phone: userFind.phone,
                city: userFind.city,
            }
        })




    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}



module.exports = { userSignUp, userLogIn, userFind, userUpdate, userDelete }