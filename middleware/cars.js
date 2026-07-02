// const express = require('express')
// const multer  = require('multer')
// const uploads = multer({ dest: './cars' })

// module.exports=uploads;


const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/cars");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const cars = multer({ storage });

module.exports = cars;