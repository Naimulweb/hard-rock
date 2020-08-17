// selectors
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-box input");
const searchResult = document.querySelector(".search-result");
const displayLyrics = document.querySelector(".single-lyrics");
const apiURL = "https://api.lyrics.ovh"
searchBtn.addEventListener("click", getSearchResult);

// Fetch song result list from api
function getSearchResult() {
  
    const songTitle = searchInput.value;
    const API = `${apiURL}/suggest/${songTitle}`;
    if (songTitle) {
        fetch(API)
            .then(response => { return response.json() })
            .then((data) => {
                const apiData = data.data;
                const songsData = apiData.map((item) => item).slice(0, 10);

                if (!songsData.length) {
                    searchResult.innerHTML = `<h3 class="text-center">Sorry!No song Found.😫</h3>`;
                } else {
                   
                    searchResult.innerHTML = "";
                    songsData.map((song) => {
                       
                        searchResult.innerHTML += `
                        <!-- single result -->
                        <div class="single-result d-flex align-items-center justify-content-between my-3 p-3">
                            <div>
                            <a href="${song.link}" target="_blank">
                                <img src="${song.album.cover}" alt="cover of ${song.album.title}">
                            </a>
                            </div>
                            <div>
                                <h3 class="lyrics-name">
                                    <a href="${song.link}" target="_blank">${song.title}</a>
                                </h3>
                                <p class="author lead">${song.album.title} by <span style="font-style: italic;" >${song.artist.name}</span>
                                </p>
                            </div>
                            <div class="text-md-right text-center">
                                <button class="btn btn-success" 
                                onclick="getLyrics('${song.artist.name}', '${song.title}', '${song.title}', '${song.artist.name}')">
                                Get Lyrics </button>
                            </div>
                        </div>
                        <!-- single result -->
                        `;
                    });
                }

                searchInput.value = "";
            });
    } else {
        alert("Nothing to search! 😫");
    }
}

// Fetching lyrics from API
function getLyrics(artist, title, songTitle, artistName) {
    const API = `${apiURL}/v1/${artist}/${title}`;

    fetch(API)
    .then(response => {return response.json()})
        .then((data) => {
            displayLyrics.innerHTML = `
                <button class="btn btn-success mb-3 go-back" onclick="goBack()">Return..</button>
                <h2 class="text-success mb-4">${artistName} - ${songTitle}</h2>
                <pre class="lyric text-white">${
                !data.lyrics ? data.error : data.lyrics
                }</pre>
            `;
            searchResult.style.display = "none";
        });
}

// return to search results
function goBack() {
    searchResult.style.display = "block";
    displayLyrics.innerHTML = "";
}

    