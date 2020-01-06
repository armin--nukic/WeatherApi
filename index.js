const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();


const port = process.env.PORT || 3000;
app.listen(port, ( ) => console.log( `Starting server at port ${port}` ))


app.use(express.static('public'));

app.use(express.json({ limit: '1mb' }))

const database = new Datastore('armin4.db');
database.loadDatabase();


app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
      if(err){
          response.end();
          return;
      }
    response.json(data);
});
});


app.post('/api', (request, response) => {
    console.log('Hej evo requesta');
    console.log(request.body);
    const data = request.body;
 
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    response.json(data);
});


app.get('/weather/:latlog', async (request, response) => {
    console.log(request.params);
    const latlog = request.params.latlog.split(',');
    console.log(latlog);
    const lat = latlog[0];
    const log = latlog[1];
    console.log(lat, log);
    const api_key= process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${log}`
      const weather_response1 = await fetch(weather_url); 
      const weather_data = await weather_response1.json();

      const air_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${log}`
      const air_response1 = await fetch(air_url); 
      const air_data = await air_response1.json();

      const data = {
        weather: weather_data, 
        air_quality: air_data
      }

      response.json(data);

    });