const mongoose = require('mongoose');
const carEntry = require('./Model/CarModel');

mongoose.connect('mongodb://localhost/CarEntries');

carEntry.create({
    SeatNumber: 1,
CarID: "innova",
Date: "12/12/2222",
DrivingDirection: "atop"
}, (error, carEntry)=>{
console.log(error, carEntry);
})