// ---- Import Data ----

import { story } from "./data.js";
import { getResult } from "./result.js";

// ---- Credit ----

let cre = document.getElementById("credit");
let str = document.getElementById("start-button");
let audio = document.getElementById("bgm");

cre.addEventListener("click", credit);
str.addEventListener("click", start);

function credit() {
  window.open("https://x.com/kazaki_nt", "_blank");
}

// ---- Credit ----

// -------- ALL STORY --------

// ---- States ----
let currentStep = 0;
let totalScore = 0;

let isTyping = false;
let skipTyping = false;

const allwei = story.length;

// ---- Elements ----
let full = document.querySelector(".fullpage");
let card = document.createElement("div");
card.className = "card";
let cardhead = document.createElement("div");
cardhead.className = "cardhead";
let exhead = document.createElement("div");
exhead.className = "excardhead";
let pic = document.createElement("img");
pic.className = "cardpic";
let textframe = document.createElement("div");
textframe.className = "textframe";
let nor = document.createElement("div");
nor.className = "nortext";
let b = document.createElement("div");
b.className = "btext";
let choiceframe = document.createElement("div");
choiceframe.className = "choiceframe";
let choicebox = document.createElement("div");
choicebox.className = "choicebox";
let choice = document.createElement("div");
choice.className = "choice";

function start() {
    full.innerHTML = "";

    nor.innerHTML = story[0].message[0].content;
    textframe.appendChild(nor);
    card.appendChild(textframe);
    full.appendChild(card);
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