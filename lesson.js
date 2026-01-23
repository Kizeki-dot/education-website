// Lesson ID
const params = new URLSearchParams(window.location.search);
const lessonId = params.get("id") || 1;

document.getElementById("lessonTitle").textContent = "သင်ခန်းစာ " + lessonId;
document.getElementById("lessonDesc").textContent =
  "ဤသည် သင်ခန်းစာ " + lessonId + " အတွက် ဖော်ပြချက်ဖြစ်ပါသည်။";

// Fake data
const images = [
  "https://picsum.photos/800/400?random="+lessonId+"1",
  "https://picsum.photos/800/400?random="+lessonId+"2",
  "https://picsum.photos/800/400?random="+lessonId+"3"
];

const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4";
const pdfSrc = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

// Carousel
const track = document.getElementById("imageTrack");
const dots = document.getElementById("imageDots");
let current = 0;

images.forEach((src,i)=>{
  const img = document.createElement("img");
  img.src = src;
  img.onclick = ()=>openImage(src);
  track.appendChild(img);

  const dot = document.createElement("span");
  if(i===0) dot.classList.add("active");
  dot.onclick=()=>goSlide(i);
  dots.appendChild(dot);
});

function goSlide(i){
  current=i;
  track.style.transform=`translateX(-${i*100}%)`;
  dots.querySelectorAll("span").forEach((d,idx)=>{
    d.classList.toggle("active",idx===i);
  });
}
function nextSlide(){ if(current<images.length-1) goSlide(current+1); }
function prevSlide(){ if(current>0) goSlide(current-1); }

// Swipe
let startX=0;
track.addEventListener("touchstart",(e)=> startX=e.touches[0].clientX);
track.addEventListener("touchend",(e)=>{
  let endX=e.changedTouches[0].clientX;
  if(startX-endX>50) nextSlide();
  if(endX-startX>50) prevSlide();
});

// Video popup
document.getElementById("lessonVideo").src = videoSrc;

function openVideo(){
  document.getElementById("videoPopup").style.display="flex";
}
function closeVideo(){
  document.getElementById("videoPopup").style.display="none";
  document.getElementById("lessonVideo").pause();
}
function closeVideoOutside(e){
  if(e.target.id==="videoPopup") closeVideo();
}

// Image popup (with in-page fullscreen)
function openImage(src){
  const popup = document.getElementById("imagePopup");
  const img = document.getElementById("popupImage");
  img.src = src;

  // start normal mode each time
  popup.classList.remove("is-full");
  popup.style.display="flex";
}

function toggleImageFullView(){
  const popup = document.getElementById("imagePopup");
  popup.classList.toggle("is-full");
}

function closeImage(){
  const popup = document.getElementById("imagePopup");
  popup.classList.remove("is-full");
  popup.style.display="none";
}

function closeImageOutside(e){
  if(e.target.id==="imagePopup") closeImage();
}

// PDF
function openPdf(){
  if(confirm("PDF ဖတ်လိုပါက OK ကိုနှိပ်ပေးပါ")){
    window.open(pdfSrc,"_blank");
  }
}

// Homework upload
const hwInput = document.getElementById("lessonHomework");
const preview = document.getElementById("lessonPreview");
const sent = document.getElementById("lessonSentList");
const statusText = document.getElementById("lessonUploadStatus");

hwInput.addEventListener("change",()=>{
  preview.innerHTML="";
  [...hwInput.files].forEach(f=>{
    const img=document.createElement("img");
    img.src=URL.createObjectURL(f);
    preview.appendChild(img);
  });
});

function sendLessonHomework(){
  if(hwInput.files.length===0){
    alert("ဓာတ်ပုံရွေးပါ");
    return;
  }

  sent.innerHTML="";
  [...hwInput.files].forEach(f=>{
    const wrapper=document.createElement("div");
    wrapper.className="sent-img";

    const img=document.createElement("img");
    img.src=URL.createObjectURL(f);

    const tick=document.createElement("div");
    tick.className="tick";
    tick.textContent="✓";

    wrapper.appendChild(img);
    wrapper.appendChild(tick);
    sent.appendChild(wrapper);
  });

  statusText.textContent="အိမ်စာပို့ပြီးပါပြီ ✅";
  preview.innerHTML="";
  hwInput.value="";
}
