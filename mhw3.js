//CambiaImmagine Logo-Etnaland
document.addEventListener('DOMContentLoaded', function() {
  function cambiaImmagine() {
    const image = document.querySelector('#logo-etnaland');
    image.src = 'immagini/logo-etnaland2.png';
  }
  function ripristinaImmagine() {
    const image = document.querySelector('#logo-etnaland');
    image.src = 'immagini/logo-etnaland1.png';
  }
  const image = document.querySelector('#logo-etnaland');
  image.addEventListener('mouseenter', cambiaImmagine);
  image.addEventListener('mouseleave', ripristinaImmagine);
});

 //box con immagini che scorrono 
const images = [
  'immagini/scorri.jpg',
  'immagini/scorri2.jpg',
  'immagini/scorri3.jpg',
  'immagini/scorri4.jpg',
  'immagini/scorri5.jpg',
  'immagini/scorri6.jpg',
  'immagini/scorri7.jpg'

];
function scrollImagesWithTimeout(index) {
  if (index >= 6  ) {
    index = 0;
  }
  const imgElement = document.getElementById('immagine-box2');
  imgElement.src = images[index];

  setTimeout(function() {
    scrollImagesWithTimeout(index + 1);
  }, 2000);
}
scrollImagesWithTimeout(0);

//Menù a tendina che compaiono con mouseover-mouseout
function createDropdownMenu(linkSelector, overlaySelector, opacityValue) {
  const link = document.querySelector(linkSelector);
  let overlay = document.querySelector(overlaySelector);

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  let isMouseOver = false;

  link.addEventListener('mouseover', () => {
    overlay.style.opacity = opacityValue;
  });

  link.addEventListener('mouseout', () => {
    if (!isMouseOver) {
      overlay.style.opacity = '0';
    }
  });

  overlay.addEventListener('mouseover', () => {
    isMouseOver = true;
    overlay.style.opacity = opacityValue;
  });

  overlay.addEventListener('mouseout', () => {
    isMouseOver = false;
    overlay.style.opacity = '0';
  });
}
createDropdownMenu('.them', '.overlay', '1');
createDropdownMenu('.acqua', '.overlay2', '1');
createDropdownMenu('.cal1', '.overlay3', '1');
createDropdownMenu('.cal2', '.overlay4', '1');
createDropdownMenu('.intestazione1', '.overlay5', '1');
createDropdownMenu('.prei', '.overlay6', '1');


// Funzione zoom su immagini
function applyZoomEffect(elementId, scale) {
  document.getElementById(elementId).style.transform = "scale(" + scale + ")";
}
function addZoomEvents(elementId) {
  document.getElementById(elementId).addEventListener("mouseenter", function() {
    applyZoomEffect(elementId, 1.1);
  });
  document.getElementById(elementId).addEventListener("mouseleave", function() {
    applyZoomEffect(elementId, 1);
  });
}
addZoomEvents("immagine_them");
addZoomEvents("immagine_acqua");
addZoomEvents("immagine_prei");
addZoomEvents("video");
addZoomEvents("cal");
addZoomEvents("cal1");
addZoomEvents("cal2");
addZoomEvents("cal3");
addZoomEvents("cal4");
addZoomEvents("cal5");
addZoomEvents("ita");
addZoomEvents("ing");
addZoomEvents("bottone");

//spostare immagine verso l'alto
function moveImageUp(elementId) {
  var translateY = "-10px";
  document.getElementById(elementId).style.transform = "translateY(" + translateY + ")";
}

function resetImagePosition(elementId) {
  document.getElementById(elementId).style.transform = "translateY(0)";
}

function addImageEvents(elementId) {
  document.getElementById(elementId).addEventListener("mouseenter", function() {
    moveImageUp(elementId);
  });
  document.getElementById(elementId).addEventListener("mouseleave", function() {
    resetImagePosition(elementId);
  });
}

addImageEvents("social");
addImageEvents("calendario");
addImageEvents("shop");
addImageEvents("photoland");
addImageEvents("newsletter");
addImageEvents("primacompri");

// bottone che scorre verso l'alto
var goToTopButton = document.getElementById("bottone");
goToTopButton.addEventListener("click", function() {
 
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});

//Menù a tendina
document.addEventListener("DOMContentLoaded", function() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.getElementById("close"); 

  mobileMenuToggle.addEventListener("click", function() {
    mobileMenu.classList.toggle("attivo");
  });

  closeBtn.addEventListener("click", function() {
    mobileMenu.classList.remove("attivo");
  });
});

document.addEventListener('DOMContentLoaded', function() {
  getWeatherInBelpasso();
});
function getWeatherInBelpasso() {
  const apiKey = 'ef82e61afdbfcd94e362480cec6c3a17';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.589820&lon=14.976828&appid=${apiKey}&units=metric`;

  fetch(url)
      .then(response => {
          if (response.status !== 200) {
              console.error('Si è verificato un problema. Codice di stato:', response.status);
              return;
          }
          return response.json();
      })
      .then(data => {
          if (data) {
              updateWeatherDisplay(data);
          }
      })
      .catch(error => {
          console.error('Si è verificato un errore durante la richiesta meteo:', error);
      });
}

function updateWeatherDisplay(data) {
  const weatherInfo = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');

  if (weatherInfo) {
      weatherInfo.textContent = `- Temperatura: ${data.main.temp}°C, Condizioni: ${data.weather[0].description}`;
  }

  if (weatherIcon) {
      // Imposta il percorso dell'immagine in base alla descrizione del tempo
      let iconSrc;
      switch (data.weather[0].main.toLowerCase()) {
          case 'clear':
              iconSrc ="immagini/sole.png"; // Percorso dell'immagine per tempo soleggiato
              break;
          case 'clouds':
              iconSrc = 'immagini/nuvoloso.png'; // Percorso dell'immagine per tempo nuvoloso
              break;
          case 'rain':
              iconSrc ="immagini/pioggia.png"; // Percorso dell'immagine per tempo piovoso
              break;
           default:
                iconSrc = "immagini/sole.png";  // Assicurati di avere un'immagine di default
                break;
      }
      weatherIcon.src = iconSrc;
  }
}

function onResponse(response) {
  console.log(response.status);
  return response.json();
}
    
    function onJToken(json) {
        console.log(json);
        const token = json.access_token;
        fetchVideoData(token);
    }
    
    function fetchVideoData(token) {
        const videoUrl = 'https://api.vimeo.com/videos/942502140'; 
        fetch(videoUrl, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.vimeo.*+json;version=3.4'
            }
        }).then(onResponse).then(onJsonV); 
    }
    
   
    const client_id = '3b3bb10a9fc95277e1a26e361945e71824ffac34';
    const client_secret = 'zOt6h1XMoa7OoodwYJRKl5yltYszrHeQjXkn910dzIcZDQF6HcZSFgpX2t0QUKA4/sUPlgcy/yUiUDLWRn2kpTV2o17EwHMCEnXjpZ2InXx7cvGWbNhfJcuV/uItM28w';
    const vimeo_token = 'https://api.vimeo.com/oauth/authorize/client'; 
    const st = { grant_type: "client_credentials", scope: "public" };
    const bodytype = JSON.stringify(st);
    
    fetch(vimeo_token, {
        method: "post",
        body: bodytype,
        headers: {
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.vimeo.*+json;version=3.4'
        }
    }).then(onResponse).then(onJToken);
    
    function onJsonV(json) {
      console.log("Video Data:", json);
      let iframe = document.createElement('iframe');
      iframe.src = json.player_embed_url;
      iframe.width = "1520";
      iframe.height = "700";
      iframe.allow = "autoplay; fullscreen";
      iframe.allowFullscreen = true;
      let div = document.getElementById('video1');
      div.appendChild(iframe);
    }
document.addEventListener('DOMContentLoaded', function() {
  const videoTrigger = document.getElementById('video');
  if (videoTrigger) {
      videoTrigger.addEventListener('click', function() {
          const videoContainer = document.getElementById('video1');
          if (!videoContainer.querySelector('iframe')) {  
              const iframe = document.createElement('iframe');             
          }
          
       if (!videoContainer.querySelector('.close-button')) {
                const closeButton = document.createElement('button');
                closeButton.classList.add('close-button');
                closeButton.textContent = 'Chiudi';
                closeButton.addEventListener('click', function() {
                    videoContainer.style.display = 'none';
                });
                videoContainer.appendChild(closeButton);
            }

            videoContainer.style.display = 'flex';
          });
        }
    });


   
  
      