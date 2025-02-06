import { generateMusicItemUsingInnerHTML, generateMusicItemUsingTemplate, getAllMusics } from "./utils.js";

const drawerButton = document.querySelector('#drawer-button');
const drawerNavigation = document.querySelector('#navList');

function setupDrawer() {
  drawerButton.addEventListener('click', () => {
    drawerNavigation.classList.toggle('open');
  });

  document.body.addEventListener('click', (event) => {
    if (!drawerNavigation.contains(event.target) && !drawerButton.contains(event.target)) {
      drawerNavigation.classList.remove('open');
    }
  });
}

function stopOtherAudio(currentAudio) {
  const allAudio = document.querySelectorAll("audio");

  allAudio.forEach((audio) => {
    if (currentAudio !== audio) {
      audio.pause();
    }
  });
}

function setupOnlyOneAudioIsPlaying() {
  // Function ini dimanfaatkan untuk mengaktifkan satu audio saja.
  const allAudio = document.querySelectorAll("audio");

  allAudio.forEach((audio) => {
    audio.addEventListener("play", (event) => {
      const currentAudio = event.currentTarget;
      stopOtherAudio(currentAudio);
    });
  });
}

function init() {
  setupDrawer();

  // Lakukan get musics dan render ke DOM di sini
  const musicList = getAllMusics();
  const musicContainer = document.getElementById("musicList");
  musicContainer.innerHTML = "";

  musicList.forEach((music) => {
    // cara 1
    // const musicCard = generateMusicItemUsingInnerHTML(music);
    // musicContainer.innerHTML += musicCard;

    // cara 2
    const musicCard = generateMusicItemUsingTemplate(music);
    musicContainer.appendChild(musicCard);
  })


  setupOnlyOneAudioIsPlaying();
}

init();