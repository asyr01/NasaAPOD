const resultsNav = document.getElementById('resultsNav');
const favuritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.laoder');

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