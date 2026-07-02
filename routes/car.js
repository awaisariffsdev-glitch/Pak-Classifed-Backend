const express = require("express");
const { carAdd } = require("../controllers/car.controller");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/add", authMiddleware, carAdd);



module.exports=router;