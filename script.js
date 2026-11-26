
// ==========================================
// PROJECT SWE — THE MIDNIGHT SURPRISE
// Main JavaScript
// ==========================================

// PASSWORD
const PASSWORD = "06012026";


// ==========================================
// PHOTO CAPTIONS
// ==========================================

const childhoodCaptions = [
  "A little beginning",
  "Little memories",
  "The early chapters"
];

const portraitCaptions = [
  "Simply you",
  "That smile",
  "Your own kind of magic",
  "Beautifully becoming",
  "A favourite view"
];

const coupleCaptions = [
  "A moment with you",
  "Our little world",
  "The memories I keep",
  "Us, in our own way",
  "Little things I treasure",
  "A memory to keep"
];


// ==========================================
// PHOTO GROUPS
// ==========================================

const groups = [
  ["childhood-grid", childhoodCaptions, 3, "memory"],
  ["portrait-grid", portraitCaptions, 5, "portrait"],
  ["couple-grid", coupleCaptions, 6, "couple"]
];


// ==========================================
// LOAD PHOTOS AUTOMATICALLY
// ==========================================

groups.forEach(([id, captions, count, kind]) => {

  const el = document.getElementById(id);

  if (!el) {
    console.warn(`Photo container not found: ${id}`);
    return;
  }

  for (let i = 1; i <= count; i++) {

    const card = document.createElement("div");
    card.className = "photo-slot";

    card.innerHTML = `
      <span class="slot-number">
        ${String(i).padStart(2, "0")}
      </span>
      <span class="slot-label">
        ${captions[i - 1]}
      </span>
    `;

    const img = new Image();

    img.src = `assets/memories/${kind}-${i}.jpg`;
    img.alt = captions[i - 1];

    img.onload = () => {
      card.prepend(img);
      card.querySelector(".slot-number")?.remove();
    };

    img.onerror = () => {
      console.error(`Image not found: ${img.src}`);
    };

    el.appendChild(card);
  }

});


// ==========================================
// SCREEN NAVIGATION
// ==========================================

const screens = [
  ...document.querySelectorAll(".screen")
];

function show(id) {

  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  document
    .querySelectorAll(`#${id} .reveal`)
    .forEach((el, i) => {

      el.style.animation = "none";

      void el.offsetWidth;

      el.style.animation =
        `rise .9s ${i * 0.12}s both`;

    });

}


// ==========================================
// PASSWORD UNLOCK
// ==========================================

const unlockForm = document.getElementById("unlock-form");
const passwordInput = document.getElementById("password");
const gateError = document.getElementById("gate-error");

if (unlockForm) {

  unlockForm.addEventListener("submit", e => {

    e.preventDefault();

    const val = passwordInput.value;

    if (val === PASSWORD) {

      sessionStorage.setItem("swe-unlocked", "yes");

      if (gateError) {
        gateError.textContent = "";
      }

      show("welcome");

    } else {

      if (gateError) {
        gateError.textContent =
          "That isn't quite right. Try again.";
      }

      passwordInput.value = "";
      passwordInput.focus();

    }

  });

}


// ==========================================
// CHAPTER NAVIGATION
// ==========================================

document
  .querySelectorAll("[data-go]")
  .forEach(btn => {

    btn.addEventListener("click", () => {

      show(btn.dataset.go);

    });

  });


// ==========================================
// REPLAY BUTTON
// ==========================================

const replayButton = document.getElementById("replay");

if (replayButton) {

  replayButton.addEventListener("click", () => {

    show("welcome");

  });

}


// ==========================================
// LOVE LETTER ENVELOPE
// ==========================================

const envelope = document.getElementById("envelope");
const letterMessage = document.getElementById("letter-message");

function openLetter() {

  if (!envelope || !letterMessage) return;

  envelope.classList.toggle("open");

  letterMessage.hidden =
    !envelope.classList.contains("open");

}

if (envelope) {

  envelope.addEventListener("click", openLetter);

  envelope.addEventListener("keydown", e => {

    if (e.key === "Enter" || e.key === " ") {

      e.preventDefault();

      openLetter();

    }

  });

}


// ==========================================
// BACKGROUND MUSIC
// ==========================================

let playing = false;

const player = document.getElementById("youtube-player");
const musicBtn = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");

function setMusic(on) {

  if (!player || !player.contentWindow) {
    console.error("YouTube music player not found.");
    return;
  }

  playing = on;

  player.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: on ? "playVideo" : "pauseVideo",
      args: []
    }),
    "https://www.youtube-nocookie.com"
  );

  if (musicLabel) {

    musicLabel.textContent = on
      ? "PAUSE OUR SONG"
      : "PLAY OUR SONG";

  }

  if (musicBtn) {

    musicBtn.setAttribute(
      "aria-label",
      on ? "Pause music" : "Play music"
    );

  }

}

if (musicBtn) {

  musicBtn.addEventListener("click", () => {

    setMusic(!playing);

  });

}


// ==========================================
// INITIAL SCREEN
// ==========================================

// Always start with the password screen
// when the website is freshly loaded.

sessionStorage.removeItem("swe-unlocked");

show("gate");


// ==========================================
// END OF PROJECT SWE
// ==========================================
