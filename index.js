//const fetchMyIP = require('./iss');
//const fetchCoordsByIP = require('./iss');
//const fetchISSFlyOverTimes = require('./iss');
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didnt work", error);
    return;
  }
  console.log("It worked, returned IP", ip);
  
});


fetchCoordsByIP('162.245.144.188', (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned Coords:' , coords);
});



fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});
*/

const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {

  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.duration);
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didnt work",error);
  }
  printPassTimes(passTimes);
});