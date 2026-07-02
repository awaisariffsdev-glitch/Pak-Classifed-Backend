const express = require('express')
const multer  = require('multer')
const cars = multer({ dest: './cars' })

module.exports=cars;


// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/cars");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const cars = multer({ storage });

// module.exports = cars;