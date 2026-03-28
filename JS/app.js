// // ---- Import Data ----

// import { story } from "./data.js";
// import { getResult } from "./result.js";

// // ---- Credit ----

// let cre = document.getElementById("credit");
// let str = document.getElementById("start-button");
// let audio = document.getElementById("bgm");

// cre.addEventListener("click", credit);
// str.addEventListener("click", start);

// function credit() {
//   window.open("https://x.com/kazaki_nt", "_blank");
// }

// // ---- Credit ----

// // -------- ALL STORY --------

// // ---- States ----
// let currentStep = 0;
// let totalScore = 0;

// let isTyping = false;
// let skipTyping = false;

// const allwei = story.length;

// // ---- Elements ----
// let full = document.querySelector(".fullpage");
// let card = document.createElement("div");
// card.className = "card";
// let cardhead = document.createElement("div");
// cardhead.className = "cardhead";
// let exhead = document.createElement("div");
// exhead.className = "excardhead";
// let pic = document.createElement("img");
// pic.className = "cardpic";
// let textframe = document.createElement("div");
// textframe.className = "textframe";
// let nor = document.createElement("div");
// nor.className = "nortext";
// let b = document.createElement("div");
// b.className = "btext";
// let choiceframe = document.createElement("div");
// choiceframe.className = "choiceframe";
// let choicebox = document.createElement("div");
// choicebox.className = "choicebox";
// let choice = document.createElement("div");
// choice.className = "choice";

// function start() {
//     full.innerHTML = "";

//     nor.innerHTML = story[0].message[0].content;
//     textframe.appendChild(nor);
//     card.appendChild(textframe);
//     full.appendChild(card);
// }

// // ---- Music ----

// function startMusic() {
//   audio.volume = 0.3;
//   if (!audio) return;

//   audio.play().then(() => {
//     console.log("Music playing");
//   }).catch((err) => {
//     console.log("Autoplay blocked:", err);
//   });
// }

// function enableAutoPlay() {
//   startMusic();

//   document.removeEventListener("click", enableAutoPlay);
//   document.removeEventListener("touchstart", enableAutoPlay);
// }

// document.addEventListener("click", enableAutoPlay);
// document.addEventListener("touchstart", enableAutoPlay);

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

// -------- STATES --------
let currentStep = 0;
let totalScore = 0;
let started = false;
let locked = false; // 🔥 prevent double tap
let justStarted = false;

// ---- Elements ----
let full = document.querySelector(".fullpage");

// ===== START =====
function start(e) {
  e.stopPropagation(); // 🔥 stop bubbling
  started = true;
  justStarted = true;

  full.innerHTML = "";
  renderStep();

  setTimeout(() => {
    justStarted = false;
  }, 300); // small delay
}

// ===== TAP =====
full.addEventListener("click", handleTap);

function handleTap() {
  if (!started || locked || justStarted) return;

  const step = story[currentStep];

  if (step && !step.choice) {
    locked = true;
    nextStep();
    setTimeout(() => locked = false, 300);
  }
}

// ===== FADE SCENE =====
function fadeScene(newCard) {
  newCard.style.opacity = 0;
  newCard.style.transition = "opacity 0.3s ease";

  requestAnimationFrame(() => {
    newCard.style.opacity = 1;
  });
}

// ===== RENDER =====
function renderStep() {
  const step = story[currentStep];

  if (!step) {
    showResult();
    return;
  }

  full.innerHTML = "";

  let card = document.createElement("div");
  card.className = "card";

  // ---- cardhead (ONLY IF EXISTS) ----
  if (step.head) {
    let cardhead = document.createElement("div");
    cardhead.className = "cardhead";

    let h = document.createElement("div");
    h.innerHTML = step.head;

    cardhead.appendChild(h);
    card.appendChild(cardhead);
  }

  // ---- image ----
  if (step.image) {
    let pic = document.createElement("img");
    pic.src = step.image;
    pic.className = "cardpic";
    card.appendChild(pic);
  }

  // ---- textframe ----
  let textframe = document.createElement("div");
  textframe.className = "textframe";

  if (step.message) {
    step.message.forEach(block => {
      let el;

      if (block.text === "nor") {
        el = document.createElement("div");
        el.className = "nortext";
      } else {
        el = document.createElement("div");
        el.className = "btext";
      }

      let text = block.content ? block.content : block.text;
      el.innerHTML = text;

      textframe.appendChild(el);
    });
  }

  card.appendChild(textframe);

  // ---- CHOICE ----
  if (step.choice) {
    let choiceframe = document.createElement("div");
    choiceframe.className = "choiceframe";

    for (let i = 0; i < step.choice.length; i += 2) {
      let choicebox = document.createElement("div");
      choicebox.className = "choicebox";

      for (let j = i; j < i + 2 && j < step.choice.length; j++) {
        let c = step.choice[j];

        let btn = document.createElement("div");
        btn.className = "choice";
        btn.innerHTML = c.ch;

        btn.onclick = (e) => {
          e.stopPropagation();
          totalScore += c.score;
          nextStep();
        };

        choicebox.appendChild(btn);
      }

      choiceframe.appendChild(choicebox);
    }

    card.appendChild(choiceframe);
  }

  full.appendChild(card);
  fadeScene(card); // ✅ ONLY scene fade
}

// ===== NEXT =====
function nextStep() {
  currentStep++;
  renderStep();
}

// ---- Reset ----
function resetGame() {
  currentStep = 0;
  totalScore = 0;
  started = false;

  location.reload(); // simplest + safest
}

// ===== RESULT =====
function showResult() {
  const res = getResult(totalScore);

  full.innerHTML = "";

  let card = document.createElement("div");
  card.className = "card";

  let cardhead = document.createElement("div");
  cardhead.className = "cardhead";

  let exhead = document.createElement("div");
  exhead.className = "cardhead";
  exhead.innerHTML = res.head;

  cardhead.appendChild(exhead);
  card.appendChild(cardhead);

  let textframe = document.createElement("div");
  textframe.className = "textframe";

  let ex = document.createElement("div");
  ex.className = "excardhead";
  ex.innerHTML = res.ex;

  cardhead.appendChild(ex);

  res.message.forEach(block => {
    let el = document.createElement("div");
    el.className = "nortext";
    el.innerHTML = block.text;
    textframe.appendChild(el);
  });

  let resetBtn = document.createElement("button");
  resetBtn.className = "start-button";
  resetBtn.innerText = "Play again";

  resetBtn.onclick = resetGame;

  card.appendChild(resetBtn);

  card.appendChild(textframe);

  full.appendChild(card);
  fadeScene(card); // ✅ scene fade
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
}

document.addEventListener("click", enableAutoPlay);