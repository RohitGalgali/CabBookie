var carModel = {
    carName : "MyModelCar", 
    seats : [1,2,3,4,5],
    getAvailableSeats : getSeats()
};

function getSeats(){
    return [1,2,3,4];
}
module.exports = carModel;