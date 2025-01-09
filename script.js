// Redirect and put the code in the url
// load in agent playlist
// Use spotify playback features to connect to device and play music
// http://127.0.0.1:3000/index.html => works
const clientId = "f35f70f6050e4f3aaab56714aa913445";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");



document.addEventListener("DOMContentLoaded", () => {
    const spotifyButton = document.querySelector(".spotifyButton");
    spotifyButton.addEventListener("click", () => {
        redirectToAuthCodeFlow(clientId);
    });
    
});

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else if (code){
    const accessToken =  getAccessToken(clientId, code);
    
    
    

}



async function redirectToAuthCodeFlow(clientId) {
    
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://jerrryzhou.github.io/Super-Amazing-Website/"); //Ensure redirect uri matches
    params.append("scope", "user-modify-playback-state user-read-playback-state streaming");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://jerrryzhou.github.io/Super-Amazing-Website/");
    console.log("test")
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    
    if (result.status === 400) {
        return null;
    }
    else {
    const { access_token } = await result.json();
    localStorage.setItem('access_token', access_token);
    return access_token;
    }
}
console.log("test")

// async function getPlaylist(token) {
//     const params = new URLSearchParams();
//     const result = await fetch('https://api.spotify.com/v1/playlists/4oaQS7AB9wZxGtJL1YuTw7', {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}`
//         }
//     });
//     console.log(result.json())
    
// }






  
