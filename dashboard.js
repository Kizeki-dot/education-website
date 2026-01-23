/* ===== LESSON SLIDER ===== */

let selectedLesson = null;
let selectedGame = null; // shared control

const totalLessons = 30;
const perPage = 6;
let currentLessonSlide = 0;

const lessonTrack = document.getElementById("lessonTrack");
const lessonDots = document.getElementById("lessonDots");
const lessonSearchInput = document.getElementById("lessonSearch");

function getLessonList() {
  const filter = lessonSearchInput.value.trim();
  const list = [];
  for (let i = 1; i <= totalLessons; i++) {
    const name = "သင်ခန်းစာ " + i;
    if (name.includes(filter)) list.push(i);
  }
  return list;
}

function buildLessonPages() {
  const lessons = getLessonList();
  lessonTrack.innerHTML = "";
  currentLessonSlide = 0;

  for (let p = 0; p < lessons.length; p += perPage) {
    const page = document.createElement("div");
    page.className = "carousel-page";

    lessons.slice(p, p + perPage).forEach(i => {
      const card = document.createElement("div");
      card.className = "select-option";
      card.textContent = "သင်ခန်းစာ " + i;

      card.onclick = () => {
        // Clear ALL lesson selections
        document.querySelectorAll("#lessonTrack .select-option")
          .forEach(o => o.classList.remove("selected"));

        // Clear ALL game selections
        document.querySelectorAll("#gameTrack .select-option")
          .forEach(o => o.classList.remove("selected"));

        // Reset game variable
        selectedGame = null;

        // Set lesson selection
        card.classList.add("selected");
        selectedLesson = i;
      };

      page.appendChild(card);
    });

    lessonTrack.appendChild(page);
  }

  buildDots(lessonDots, lessonTrack);
  goToLessonSlide(0);
}

function goToLessonSlide(index) {
  const total = lessonTrack.children.length;
  if (index < 0) index = 0;
  if (index > total - 1) index = total - 1;

  currentLessonSlide = index;
  lessonTrack.style.transform = `translateX(-${index * 100}%)`;
  updateDots(lessonDots, index);
}

function nextLessonSlide() {
  goToLessonSlide(currentLessonSlide + 1);
}

function prevLessonSlide() {
  goToLessonSlide(currentLessonSlide - 1);
}

lessonSearchInput.addEventListener("input", () => {
  selectedLesson = null;
  buildLessonPages();
});


/* ===== GAME SLIDER ===== */

const totalGames = 30;
let currentGameSlide = 0;

const gameTrack = document.getElementById("gameTrack");
const gameDots = document.getElementById("gameDots");
const gameSearchInput = document.getElementById("gameSearch");

function getGameList() {
  const filter = gameSearchInput.value.trim();
  const list = [];
  for (let i = 1; i <= totalGames; i++) {
    const name = "သင်ခန်းစာ " + i + " ဂိမ်း";
    if (name.includes(filter)) list.push(i);
  }
  return list;
}

function buildGamePages() {
  const games = getGameList();
  gameTrack.innerHTML = "";
  currentGameSlide = 0;

  for (let p = 0; p < games.length; p += perPage) {
    const page = document.createElement("div");
    page.className = "carousel-page";

    games.slice(p, p + perPage).forEach(i => {
      const card = document.createElement("div");
      card.className = "select-option game";
      card.textContent = "သင်ခန်းစာ " + i + " ဂိမ်း";

      card.onclick = () => {
        // Clear ALL game selections
        document.querySelectorAll("#gameTrack .select-option")
          .forEach(o => o.classList.remove("selected"));

        // Clear ALL lesson selections
        document.querySelectorAll("#lessonTrack .select-option")
          .forEach(o => o.classList.remove("selected"));

        // Reset lesson variable
        selectedLesson = null;

        // Set game selection
        card.classList.add("selected");
        selectedGame = i;
      };

      page.appendChild(card);
    });

    gameTrack.appendChild(page);
  }

  buildDots(gameDots, gameTrack);
  goToGameSlide(0);
}

function goToGameSlide(index) {
  const total = gameTrack.children.length;
  if (index < 0) index = 0;
  if (index > total - 1) index = total - 1;

  currentGameSlide = index;
  gameTrack.style.transform = `translateX(-${index * 100}%)`;
  updateDots(gameDots, index);
}

function nextGameSlide() {
  goToGameSlide(currentGameSlide + 1);
}

function prevGameSlide() {
  goToGameSlide(currentGameSlide - 1);
}

gameSearchInput.addEventListener("input", () => {
  selectedGame = null;
  buildGamePages();
});


/* ===== DOT HELPERS ===== */

function buildDots(container, track) {
  container.innerHTML = "";
  const total = track.children.length;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    container.appendChild(dot);
  }
}

function updateDots(container, index) {
  container.querySelectorAll("span").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}


/* ===== GO BUTTONS ===== */

function goLesson() {
  if (selectedLesson) {
    window.location.href = "lesson.html?id=" + selectedLesson;
  } else {
    alert("သင်ခန်းစာ တစ်ခုရွေးပါ");
  }
}

function goGame() {
  if (selectedGame) {
    window.location.href = "game.html?game=" + selectedGame;
  } else {
    alert("ဂိမ်း တစ်ခုရွေးပါ");
  }
}


/* ===== INIT ===== */

buildLessonPages();
buildGamePages();

// Homework upload (Dashboard)
const hwInputDash = document.getElementById("homeworkFile");
const previewDash = document.getElementById("previewArea");
const sentDash = document.getElementById("sentListDash");
const statusDash = document.getElementById("uploadStatus");

hwInputDash.addEventListener("change",()=>{
  previewDash.innerHTML="";
  [...hwInputDash.files].forEach(f=>{
    const img=document.createElement("img");
    img.src=URL.createObjectURL(f);
    previewDash.appendChild(img);
  });
});

function uploadHomework(){
  if(hwInputDash.files.length===0){
    alert("ဓာတ်ပုံရွေးပါ");
    return;
  }

  sentDash.innerHTML="";
  [...hwInputDash.files].forEach(f=>{
    const wrapper=document.createElement("div");
    wrapper.className="sent-img";

    const img=document.createElement("img");
    img.src=URL.createObjectURL(f);

    const tick=document.createElement("div");
    tick.className="tick";
    tick.textContent="✓";

    wrapper.appendChild(img);
    wrapper.appendChild(tick);
    sentDash.appendChild(wrapper);
  });

  statusDash.textContent="အိမ်စာပို့ပြီးပါပြီ ✅";
  previewDash.innerHTML="";
  hwInputDash.value="";
}




