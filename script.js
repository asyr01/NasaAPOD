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
let favorites = {};

function createDOMNodes(page) {
  console.log(page);
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    // Card container element
    const card = document.createElement('div');
    card.classList.add('card');
    // Link for url to view hd image on NASA.
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image on NASA';
    link.target = '_blank';
    // Image url for dynamically show it.
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = "NASA Astronomy Picture of the Day";
    image.loading = 'lazy';
    image.classList.add('card-img-top');

    // Card body elements
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h5');
    // Card Title Element
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Paragraph elements 
    // -SaveText-
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if(page==='results') {
      saveText.textContent = 'Add it to the your Favourites!';
      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = 'Remove it from the your Favourites!';
      saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
    }
    // -CardText-
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = result.explanation;

    // Footer container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date 
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;

    // Appending elements
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
 });
}

function updateDOM(page) {
  // Get Favorites from local storage
  if(localStorage.getItem('nasaFavorites')){
     favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  imagesContainer.textContent = '';
  createDOMNodes(page);
}

// Get 10 images from API
async function getNasaPictures() {
    try {
     const response = await fetch(apiUrl)
     resultsArray = await response.json();
     updateDOM('results');
    } catch(err) {
     // Catch if there is an error
     console.log(err);
    }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  //Loop through Result arrays to select Favorite which matches url
  resultsArray.forEach((item) => {
    if(item.url.includes(itemUrl) && !favorites[itemUrl]){
     favorites[itemUrl] = item;
     // Show added to favourites notification with saveConfirmed
     saveConfirmed.hidden = false;
     setTimeout(() => {
       saveConfirmed.hidden = true;
     }, 2000);
     // Set favorites in localStorage
     localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if(favorites[itemUrl]){
    delete favorites[itemUrl];
    //Set favorites in localStorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
}

// On load.
getNasaPictures(); 