const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const timerDisplay = document.querySelector('.timer');
const pop = document.querySelector('#pop');
const mulaiButton = document.querySelector('#mulai-button');

let tanahSebelumnya;
let selesai;
let skor;
let waktu = 60;

const randomTanah = tanah => {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom === tanahSebelumnya) {
    return randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
};

const randomWaktu = (min, max) => Math.round(Math.random() * (max - min) + min);

const munculkanTikus = () => {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(500, 1500);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom + 700);
};

const mulai = () => {
  selesai = false;
  skor = 0;
  waktu = 60;
  papanSkor.textContent = skor;
  timerDisplay.textContent = `${waktu}s`;
  munculkanTikus();
  const hitungMundur = setInterval(() => {
    waktu--;
    timerDisplay.textContent = `${waktu}s`;
    if (waktu <= 0) {
      clearInterval(hitungMundur);
      selesai = true;
    }
  }, 1000);
};

const pukul = function () {
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanSkor.textContent = skor;
};

tikus.forEach(t => t.addEventListener('click', pukul));

mulaiButton.addEventListener('click', mulai);
