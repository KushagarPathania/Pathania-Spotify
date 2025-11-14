
let songs = [
    {
        name: "Supreme",
        url: "songs/nira.mp3",
        poster: "images/nira.jpg"
    },
    {
        name: "Winning Speech",
        url: "songs/arabic.mp3",
        poster: "images/arabic.jpg"
    },
    {
        name: "52 Bars",
        url: "songs/vaathi.mp3",
        poster: "images/vaathi.jpg"
    },
    {
        name: "Bewafa",
        url: "songs/Bewafa.mp3",
        poster: "images/bewafa.jpg"
    }
];

let audio = new Audio();
let currentIndex = 0;
let isPlaying = false;


const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songInfo = document.querySelector(".songinfo");
const songList = document.getElementById("songList");


function loadSongs() {
    songs.forEach((song, index) => {
        let div = document.createElement("div");
        div.classList.add("song-item");
        div.innerHTML = `
            <img src="${song.poster}">
            <h4>${song.name}</h4>
        `;
        div.addEventListener("click", () => {
            currentIndex = index;
            playSong();
        });
        songList.appendChild(div);
    });
}


function playSong() {
    audio.src = songs[currentIndex].url;
    audio.play();
    isPlaying = true;

    playPauseBtn.src = "pausesymbol.svg"; 
   
    songInfo.innerHTML = `
    <img src="${songs[currentIndex].poster}">
    ${songs[currentIndex].name}`;

    updateActiveSong();
}


function updateActiveSong() {
    document.querySelectorAll(".song-item").forEach((item, i) => {
        item.classList.toggle("active", i === currentIndex);
    });
}


playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.src = "playsymbol.svg";
    } else {
        audio.play();
        playPauseBtn.src = "pausesymbol.svg";
    }
    isPlaying = !isPlaying;
});


prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? songs.length - 1 : currentIndex - 1;
    playSong();
});


nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong();
});


audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});
audio.addEventListener("loadedmetadata", () => {
    const duration = audio.duration;
    document.getElementById("totalTime").innerText = formatTime(duration);
});

audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;
    document.getElementById("currentTime").innerText = formatTime(current);
});



seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});


function formatTime(time) {
    if (!time || isNaN(time)) return "0:00";
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}



loadSongs();
const volumeBar = document.getElementById("volumeBar");

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
});


