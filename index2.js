const { nextISSTimesForMyLocation } = require('./iss_promised');
const issPassTimes = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    issPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

