const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const albumCover = document.getElementById("album-cover");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

const songs = [
  {
    title: "So High School",
    artist: "Taylor Swift",
    src: "Audio/sohighschool.mp3",
    cover: "Images/sohighschool.jpg",
    duration: "3:54"
  },
  {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    src: "Audio/espressoo.mp3",
    cover: "Images/espresso.jpg",
    duration: "2:54"
  },
  {
    title: "I Love You, I'm Sorry",
    artist: "Gracie Abrams",
    src: "Audio/ilyims.mp3",
    cover: "Images/iloveyouimsorry.jpg",
    duration: "2:40"
  },
  {
    title: "Birds Of A Feather",
    artist: "Billie Eilish",
    src: "Audio/boaf.mp3",
    cover: "Images/birdsofafeather.jpg",
    duration: "3:30"
  },
  {
    title: "Brooklyn Baby",
    artist: "Lana Del Rey",
    src: "Audio/brooklynbaby.mp3",
    cover: "Images/brooklynbaby.jpg",
    duration: "5:47"
  },
  {
    title: "Greedy",
    artist: "Tate McRae",
    src: "Audio/greedy.mp3",
    cover: "Images/greedy.jpg",
    duration: "2:11"
  },
  {
    title: "Bloodline",
    artist: "Ariana Grande",
    src: "Audio/bloodline.mp3",
    cover: "Images/bloodline.jpeg",
    duration: "3:31"
  },
  {
    title: "The Heart Wants What It Wants",
    artist: "Selena Gomez",
    src: "Audio/thwwiw.mp3",
    cover: "Images/thwwiw.jpeg",
    duration: "3:47"
  },
   {
    title: "Cool For The Summer",
    artist: "Demi Lovato",
    src: "Audio/coolforthesummer.mp3",
    cover: "Images/cfts.jpg",
    duration: "3:37"
  },
  {
    title: "Diamonds",
    artist: "Rihanna",
    src: "Audio/diamonds.mp3",
    cover: "Images/diamonds.jpeg",
    duration: "3:42"
  }
];

let audio = new Audio(songs[0].src);
let currentIndex = 0;
let isPlaying = false;

function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸️";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    isPlaying = false;
  }
}

function playSong(index) {
  currentIndex = index;
  const song = songs[index];

  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  albumCover.src = song.cover;

  audio.pause();
  audio = new Audio(song.src);
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;

  setupAudioEvents();

  document.querySelectorAll(".song-item").forEach((el) => el.classList.remove("playing"));
  document.querySelector(`.song-item[data-index="${index}"]`).classList.add("playing");
}

function setupAudioEvents() {
  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;
    const duration = audio.duration;
    currentTimeEl.textContent = formatTime(current);
    progress.value = (current / duration) * 100;
  });

  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶️";
    isPlaying = false;
  });
}

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

playBtn.addEventListener("click", togglePlay);

document.getElementById("prevBtn").addEventListener("click", () => {
  audio.currentTime = 0;
});

document.getElementById("nextBtn").addEventListener("click", () => {
  audio.currentTime = audio.duration;
});

document.querySelectorAll(".song-item").forEach((item) => {
  item.addEventListener("click", () => {
    const index = parseInt(item.getAttribute("data-index"));
    playSong(index);
  });
});

setupAudioEvents();
