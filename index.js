const { nextISSTimesForMyLocation } = require('./iss');

let issPassTimes = function(passTimes) {
  for (let times of passTimes) {
    let dates = new Date(0);
    dates.setUTCSeconds(times.risetime);
    let duration = times.duration;
    console.log(`The next passing will be at ${dates} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  issPassTimes(passTimes);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIp('173.180.191.173', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned Coordinates:', data);



// });

// const myCoordinates = { lat: 49.80202865600586, long: -124.51300811767578 };

// fetchISSFlyOverTimes(myCoordinates, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned ISS times', data);



// });