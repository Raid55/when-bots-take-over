var request = require('request');

export.modules = function getForecast(city,api,next){
  request(`http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${api}&q=${city}`,(error, response, body) => {
    console.log("making HTTP REQUEST");
    if (!error && response.statusCode == 200) {
      const parsedJson = JSON.parse(body)
      next(parsedJson)
    }else{
      throw new Error(error)
    }
  })
}
