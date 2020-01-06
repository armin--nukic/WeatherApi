function setup(){

    //noCanvas();
    //const video = createCapture(VIDEO);
    //video.size(320, 240);
    
        document.getElementById('geolocate').addEventListener('click', event =>
    {
    
     if('geolocation' in navigator){
        console.log('geolocation available');
    
    const inputic = document.getElementById('inputic').value;
   
    
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude.toFixed(2);
      const log = position.coords.longitude.toFixed(2);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = log;
      //console.log(position.coords);
     // console.log(position);
      const api_url = `weather/${lat},${log}`;
 
      const response1 = await fetch(api_url); 
      const json1 = await response1.json();
     
      console.log(json1);

      const weather =  json1.weather.currently;
      const air = json1.air_quality.results[0];
      const air_measure = json1.air_quality.results[0].measurements[0];
      const temperature =  ((json1.weather.currently.temperature - 32) * 5/9).toFixed(1);


      document.getElementById('summary').textContent = weather.summary;
      document.getElementById('temperature').textContent = ((weather.temperature - 32) * 5/9).toFixed(1);

      document.getElementById('city').textContent = air.city;
      document.getElementById('location').textContent = air.location;
      document.getElementById('air_matter').textContent = air_measure.value;

      //console.log(json1);

     // video.loadPixels();
      //const image64 = video.canvas.toDataURL();
    
      const data = {lat, log, inputic, temperature};
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      };
        const response = await fetch('/api', options)
        const json = await response.json();
        console.log(json);
        });
    }
    else{
        console.log('geolocation is not available');
    }
    });    
    
    
    }
    