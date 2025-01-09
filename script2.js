// To-do
// Token refresh
// save data
// flexbox

const access_token = localStorage.getItem('access_token');
let deviceId = undefined
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const paramValue = params.get('agent')
const image = document.querySelector(".agentImage");
if (paramValue === "sova") {
    image.src = "Sova_Artwork_Full.webp"
}
if (paramValue === "reyna") {
    image.src = "Reyna_Artwork_Full.webp"
}
if (paramValue === "cypher") {
    image.src = "Cypher_Artwork_Full.webp"
}
if (paramValue === "brimstone") {
    image.src = "Brimstone_Artwork_Full.webp"
}
if (paramValue === "sage") {
    image.src = "Sage_Artwork_Full.webp"
}
if (paramValue === "breach") {
    image.src = "Breach_Artwork_Full.webp"
}
if (paramValue === "pheonix") {
    image.src = "Phoenix_Artwork_Full.webp"
}
if (paramValue === "raze") {
    image.src = "Raze_Artwork_Full.webp"
}
if (paramValue === "viper") {
    image.src = "Viper_Artwork_Full.webp"
}
if (paramValue === "omen") {
    image.src = "Omen_Artwork_Full.webp"
}
//Use spotify playback sdk
window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(access_token); },
      volume: 0.3
    });
    player.addListener('initialization_error', ({ message }) => console.error(message));
    player.addListener('authentication_error', ({ message }) => console.error(message));
    player.addListener('account_error', ({ message }) => console.error(message));
    player.addListener('playback_error', ({ message }) => console.error(message));
    player.addListener('ready', ({ device_id }) => {
        console.log('The Web Playback SDK is ready to play music!');
        console.log('Device ID', device_id);
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const paramValue = params.get('agent')
        if (paramValue === "jett") {
            play(access_token, device_id, "4oaQS7AB9wZxGtJL1YuTw7")
        }
        if (paramValue === "sova") {
            play(access_token, device_id, "3W1GT5ISocqZnYKoTvZkeY")
        }
        if (paramValue === "reyna") {
            play(access_token, device_id, "6dGKVKNLJ0LTnS5LCwAu67")
        }
        if (paramValue === "cypher") {
            play(access_token, device_id, "4kdufh9QXuclNuvRn8ugxU")
        }
        if (paramValue === "brimstone") {
            play(access_token, device_id, "1CVaSnOl1LcuBZFOsiBM0F")
        }
        if (paramValue === "sage") {
            play(access_token, device_id, "6IjgHCNKvMw6oYtaOQjFRU")
        }
        if (paramValue === "breach") {
            play(access_token, device_id, "014q9p16Sw0GkeBQplWryG")
        }
        if (paramValue === "pheonix") {
            play(access_token, device_id, "5ElSg21Wj4X67fG9fJ3PRw")
        }
        if (paramValue === "raze") {
            play(access_token, device_id, "66IfCfxAkcJo8BAmxknPyP")
        }
        if (paramValue === "viper") {
            play(access_token, device_id, "3ccO2bmc4cjVImHAohRHcG")
        }
        if (paramValue === "omen") {
            play(access_token, device_id, "0c2az5NKPdYEGqjjov0Wa1")
        }
        
        
      })
      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      })

      player.addListener('player_state_changed', ({
        position,
        duration,
        track_window: { current_track }
      }) => {
        console.log('Currently Playing', current_track);
        console.log('Position in Song', position);
        console.log('Duration of Song', duration);
        const title = document.querySelector(".card__title");
        title.innerHTML = current_track.name;
        const subtitle = document.querySelector(".card__subtitle");
        const artists = current_track.artists;
        subtitle.innerHTML = artists.map(artist => artist.name).join(", ");
        const image = document.querySelector(".picture");
        main();
        async function main() {
           const images = (await fetchTrack(access_token, current_track.id)).album.images
           image.src = (images[0].url)
           image.width = 300
           image.height = 300

        }
        const timeLeft = document.querySelector(".card__time-left");
        timeLeft.innerHTML = formatTime(duration);
        
        
      });

      const playButton = document.querySelector(".card__btn-play");
playButton.addEventListener("click", () => {
    player.togglePlay();
});
    const backButton = document.querySelector(".back");
    backButton.addEventListener("click", () => {
        player.previousTrack();
    });

    const nextButton = document.querySelector(".next");
    nextButton.addEventListener("click", () => {
        player.nextTrack();
    });
    
  }

  

  
  





// const playButton = document.querySelector(".playButton");
// playButton.addEventListener("click", () => {
//     player.togglePlay();
// });

async function getPlaylist(token) {
    const params = new URLSearchParams();
    const result = await fetch('https://api.spotify.com/v1/playlists/4oaQS7AB9wZxGtJL1YuTw7', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`
        }
    });
    const playlist = await result.json()
    console.log(playlist)
    return playlist
    
}

async function fetchTrack(token, songId) {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`

        }
    });
    return (await result).json();
}

async function play(token, device_id, id) {
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            context_uri: `spotify:playlist:${id}` // Convert body to JSON
        })
    });
}

async function getId(token) {
    const result = fetch('https://api.spotify.com/v1/me/player/devices', {
        method: "GET", 
        headers: {Authorization: `Bearer ${token}`}
    })
    return (await result).json();
}

async function pause(token) {
    fetch('https://api.spotify.com/v1/me/player/pause', {
        method: "PUT",
        headers: {Authorization: `Bearer ${token}`}
    })
}

async function getCurrentlyPlaying(token) {
    const result = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: "GET", 
        headers: {Authorization: `Bearer ${token}`}
    })
    if (result.status === 204) {
        return null
    }
    else {
        return (await result).json();
    }
}
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000); // Convert to seconds
    const minutes = Math.floor(totalSeconds / 60);        // Get whole minutes
    const seconds = totalSeconds % 60;                   // Get remaining seconds

    // Format seconds to always have two digits
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${minutes}:${formattedSeconds}`;
}

async function updateTime() {
    const x = (await getCurrentlyPlaying(access_token));
    if (x !== null) {
    const position = x.progress_ms;
    const duration = x.item.duration_ms;
    const timePassed = document.querySelector(".card__time-passed");
    timePassed.innerHTML = formatTime(position)
    const progressBar = document.querySelector(".bar");
    progressBar.value = (position / duration) * 100;
    }
}

setInterval(updateTime, 1000);


