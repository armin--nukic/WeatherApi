getData()
async function getData()
{
    const response = await fetch('/api');
    const data = await response.json();

    for(item of data){
        const root = document.createElement('div');
        const inputic = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const temperature = document.createElement('div');
        //const image = document.createElement('img');
       

        inputic.textContent = `Input: ${item.inputic}`;
        geo.textContent = `Latitude: ${item.lat}°, Longitude: ${item.log}°`;
        temperature.textContent = `Temperature: ${item.temperature}`;

        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
       // image.src = item.image64;
        // image.alt = 'To vam je Armin';

        
        root.append(inputic, geo, date, temperature) + "<br>";
        document.body.append(root);
    }

    console.log(data);
}