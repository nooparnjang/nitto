// ---- Import Data ----

import { story } from "../JS/data.js";
import { result } from "../JS/result.js";

// ---- Start Button & Credit ----

let cre = document.getElementById("credit");
let str = document.getElementById("start-button");
let audio = document.getElementById("bgm");

cre.addEventListener("click", credit);
str.addEventListener("click", start);

function credit() {
    window.open("https://x.com/kazaki_nt", "_blank");
}

function start() {
    document.querySelector(".fullpage").innerHTML = "";
}

// ---- Music ----

function startMusic() {
  audio.volume = 0.3;
  if (!audio) return;

  audio.play().then(() => {
    console.log("Music playing");
  }).catch((err) => {
    console.log("Autoplay blocked:", err);
  });
}

function enableAutoPlay() {
  startMusic();

  document.removeEventListener("click", enableAutoPlay);
  document.removeEventListener("touchstart", enableAutoPlay);
}

document.addEventListener("click", enableAutoPlay);
document.addEventListener("touchstart", enableAutoPlay);

// ----------------------------------------------------------

