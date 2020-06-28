const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org?format=json', (error, resp, body) => {

    if (error) return callback(error,null);

    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    callback(null,JSON.parse(body).ip);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`,  (error, resp, body) => {
    if (error) return callback(error,null);

    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });

  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=37.38600&lon=-122.08380`,  (error, resp, body) => {
    if (error) return callback(error,null);

    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;

    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip,(error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyTimes) => {
        if (error) {
          return callback(error, null);
        }
        for (const times of flyTimes) {

          const unixTime = times.risetime;
          const datetime = new Date(0);
          datetime.setUTCSeconds(unixTime);
          const duration = times.duration;

          console.log(`Next pass ${datetime} at  for ${times.duration} seconds`);
        }
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };