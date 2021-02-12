const resultsNav = document

// NASA API KEY
const count = 10;
const apiKey = config.API_KEY;;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 10 images from API
async function getNasaPictures() {
    try {
     const response = await fetch(apiUrl)
     resultsArray = await response.json();
     console.log(resultsArray);
    } catch(err) {
     // Catch if there is an error
     console.log(err);
    }
}


// On load.
getNasaPictures(); 