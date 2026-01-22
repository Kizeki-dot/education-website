// ===== SIGNUP VALIDATION LOGIC =====

function signupFake(event){
  event.preventDefault();

  const grade = parseInt(document.getElementById("grade").value);
  const startGrade = parseInt(document.getElementById("startGrade").value);
  const ageInput = parseInt(document.getElementById("age").value);
  const birthdateValue = document.getElementById("birthdate").value;

  // ✅ FIX: allow KG=0 (0 is valid, don't use "!grade" checks)
  if (Number.isNaN(grade) || Number.isNaN(startGrade) || Number.isNaN(ageInput) || !birthdateValue) {
    alert("အချက်အလက်အားလုံး ဖြည့်ပေးပါ");
    return;
  }

  const birthdate = new Date(birthdateValue);
  const today = new Date();

  // Calculate real age from birthdate
  let realAge = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    realAge--;
  }

  // 1) Age field must match birthdate
  if (ageInput !== realAge) {
    alert("အသက်နှင့် မွေးသက္ကရာဇ် မကိုက်ညီပါ");
    return;
  }

  // 2) Minimum age rule with KG support
  // KG (0) => 5, Grade 1 => 6, Grade 2 => 7 ...
  const minAge = grade + 5;
  if (realAge < minAge) {
    alert(`ရွေးထားသောအတန်းအတွက် အသက် ${minAge} နှစ်အနည်းဆုံး လိုအပ်ပါသည်`);
    return;
  }

  // 3) Maximum reasonable age rule (anti-lying)
  const maxAge = grade + 8;
  if (realAge > maxAge) {
    alert("ရွေးထားသောအတန်းနှင့် အသက် မကိုက်ညီပါ");
    return;
  }

  // 4) Start grade must not exceed current grade
  if (startGrade > grade) {
    alert("စတင်သင်ကြားခဲ့သည့် အတန်းသည် လက်ရှိအတန်းထက် မမြင့်ရပါ");
    return;
  }

  // ✅ Passed all checks → go to thank you page (or dashboard if you want)
  window.location.href = "thankyou.html";
}


// ===== START-GRADE LIMITER =====
// Disable startGrade options that are higher than current grade

document.getElementById("grade").addEventListener("change", function() {
  const currentGrade = parseInt(this.value);
  const startSelect = document.getElementById("startGrade");

  for (let option of startSelect.options) {
    const val = parseInt(option.value);

    // ✅ FIX: placeholder is NaN, but KG=0 must be allowed
    if (Number.isNaN(val)) continue;

    option.disabled = val > currentGrade;
  }

  // Reset startGrade if it becomes invalid
  const chosen = parseInt(startSelect.value);
  if (!Number.isNaN(chosen) && chosen > currentGrade) {
    startSelect.value = "";
  }
});
