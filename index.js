const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const morgan = require("morgan");
const authMiddleware = require("./middleware/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const User = require("./models/user.models")
app.use(morgan("dev"));
// const cors = require("cors")
// app.use(cors);
// const cors = require("cors");
// app.use(cors({
//     origin: "https://pak-classifed-frontend.vercel.app",
//     credentials: true
// }));
const allowedOrigins = [
    "https://pak-classifed-frontend.vercel.app",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use("/uploads", express.static("uploads"));
app.use("/cars", express.static("cars"));


app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email Is required"
            })
        };

        const userFind = await User.findOne({ email });
        if (!userFind) {
            return res.status(400).json({
                message: "Email IS required"
            })
        };

        return res.status(200).json({
            message: "User Find Successfully",
            userFind
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        })
    }
})

app.use("/user", require("./routes/user"));
app.use("/car", require("./routes/car"));

app.get("/", (req, res) => {
    return res.send(" Hello ")
})


app.use((err, req, res, next) => {
    return res.send(err)
})

app.use((req, res, next) => {
    return res.status(404).json({ message: "No route matched, 404 not found" })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Is Running On http://localhost:${PORT}`);
    connectDb();
})