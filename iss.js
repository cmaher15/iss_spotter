const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp('173.180.191.173', (error, MyCoordinates) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(MyCoordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  });
};


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body);
    callback(null, ip);
  });
};


const fetchCoordsByIp = function(ip, callback) {
  request(`https://api.ipbase.com/v2/info?apikey=wD7RkUV0oxKVa1KaCFuHCzL3WCaQvEXs4OxkbQSD&ip=${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP coordintes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const lat = data.data.location.latitude;
    const long = data.data.location.longitude;
    callback(null, { lat, long });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.long}`
    , function(error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS timestamps. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const passes = JSON.parse(body).response;
      callback(null, passes);
    });
};



module.exports = { nextISSTimesForMyLocation };