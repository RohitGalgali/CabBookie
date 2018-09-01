const mongoose = require('mongoose');
const carEntry = require('./Model/CarModel');

mongoose.connect('mongodb://localhost/CarEntries');

carEntry.create({
    SeatNumber: 2,
    CarID: "Innova",
    Date: "2018-09-01",
    DrivingDirection: "a2p"
}, (error, carEntry) => {
    console.log(error, carEntry);

})
// carEntry.find({},(error, carEntry)=>{
//     if(!error)
//     {
//         console.log(error, carEntry);
//     }
//})
