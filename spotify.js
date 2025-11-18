
let songs = [
    { name: "Supreme", url: "songs/Supreme.mp3", poster: "images/Supreme.jpg" },
    { name: "Winning Speech", url: "songs/Winning Speech.mp3", poster: "images/Winning Speech.jpg" },
    { name: "52 Bars", url: "songs/52 Bars.mp3", poster: "images/52 Bars.jpg" },
    { name: "Bewafa", url: "songs/Bewafa.mp3", poster: "images/bewafa.jpg" },
    { name: "Haseen", url: "songs/Haseen.mp3", poster: "images/Haseen.jpg" },
    { name: "Khyaal", url: "songs/Khyaal.mp3", poster: "images/Khyaal.jpg" },
    { name: "Dhundhala", url: "songs/Dhundhala.mp3", poster: "images/Dhundhala.jpg" }
];

let audio = new Audio();
let currentIndex = 0;
let isPlaying = false;


const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seekBar = document.getElementById("seekBar");

const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

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
        ${songs[currentIndex].name}
    `;

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


audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});


const volumeBar = document.getElementById("volumeBar");
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
});


function formatTime(time) {
    if (!time || isNaN(time)) return "0:00";
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

loadSongs();


const playlistContainer = document.getElementById("playlistSongsContainer");
const cardContainer = document.querySelector(".cardcontainer");

let daySongs = [
    { name: "52 Bars", url: "songs/52 Bars.mp3", poster: "images/52 Bars.jpg" },
    { name: "Jo Tere Sang", url: "songs/Jo Tere Sang.mp3", poster: "images/Jo Tere Sand.jpg" },
    { name: "Winning Speech", url: "songs/Winning Speech.mp3", poster: "images/Winning Speech.jpg" },
    { name: "Supreme", url: "songs/Supreme.mp3", poster: "images/Supreme.jpg" }
];

let nightSongs = [
    { name: "Bewafa", url: "songs/Bewafa.mp3", poster: "images/bewafa.jpg" },
    { name: "Khyaal", url: "songs/Khyaal.mp3", poster: "images/Khyaal.jpg" },
    { name: "Haseen", url: "songs/Haseen.mp3", poster: "images/Haseen.jpg" },
    { name: "Dhundhala", url: "songs/Dhundhala.mp3", poster: "images/Dhundhala.jpg" }
];

document.getElementById("dayPlaylist").addEventListener("click", () => openPlaylist(daySongs));
document.getElementById("nightPlaylist").addEventListener("click", () => openPlaylist(nightSongs));

function openPlaylist(list) {
    cardContainer.style.display = "none";
    playlistContainer.innerHTML = `
        <button id="backBtn" class="back-btn">⬅ Back</button>
    `;
    playlistContainer.style.display = "block";

    list.forEach(song => {
        let div = document.createElement("div");
        div.classList.add("song-item");
        div.innerHTML = `
            <img src="${song.poster}">
            <h4>${song.name}</h4>
        `;
        div.addEventListener("click", () => {
            audio.src = song.url;
            audio.play();
            playPauseBtn.src = "pausesymbol.svg";
            songInfo.innerHTML = `<img src="${song.poster}">${song.name}`;
        });
        playlistContainer.appendChild(div);
    });

    document.getElementById("backBtn").addEventListener("click", () => {
        playlistContainer.style.display = "none";
        cardContainer.style.display = "flex";
    });
}


const ham = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("leftPanel");
const closeBtnSidebar = document.getElementById("closeSidebar");

ham.addEventListener("click", () => {
    sidebar.classList.add("active");
});

closeBtnSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
});
