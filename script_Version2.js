// Customize these two values:
const CRUSH_NAME = "[NIDHI]";
const YOUR_NAME = "[PRITESH]";

// Small typewriter + interaction script
const lines = [
  `I've been wanting to tell you something for a while...`,
  `You make my days brighter and my coffee taste better ☕️`,
  `So—would you like to go out with me sometime?`
];

const typeEl = document.getElementById('typewriter');
document.getElementById('crushName').textContent = CRUSH_NAME;
document.getElementById('yourName').textContent = YOUR_NAME;

let lineIndex = 0;

function typeLine(line, i = 0) {
  if (i <= line.length) {
    typeEl.textContent = line.slice(0, i) + (i % 2 === 0 ? '|' : '');
    setTimeout(() => typeLine(line, i + 1), 28);
  } else {
    typeEl.textContent = line; // final
    // pause then next
    setTimeout(() => {
      lineIndex++;
      if (lineIndex < lines.length) {
        typeLine(lines[lineIndex]);
      } else {
        // enable choice buttons
        document.getElementById('choices').setAttribute('aria-hidden', 'false');
        document.getElementById('yesBtn').focus();
      }
    }, 850);
  }
}

// Start typing after small delay
setTimeout(() => {
  typeLine(lines[lineIndex]);
}, 700);

// Button handlers
document.getElementById('yesBtn').addEventListener('click', async () => {
  await showAcceptance();
});

document.getElementById('noBtn').addEventListener('click', () => {
  showKindDecline();
});

function showAcceptance() {
  return new Promise(resolve => {
    const result = document.getElementById('result');
    result.textContent = `Yay! 🥳 I'd love that. When are you free?`;
    burstConfetti();
    resolve();
  });
}

function showKindDecline() {
  const result = document.getElementById('result');
  result.textContent = `Thanks for being honest — I still think you're awesome.`;
  // gentle animation
  result.style.opacity = 0;
  result.animate([{opacity:0},{opacity:1}], {duration:450, fill:'forwards'});
}

/* Simple confetti: create falling emoji pieces */
function burstConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#ff6b9a','#ffcf5c','#7dd3fc','#c1fba4','#f0a6ff'];
  const emojis = ['💖','🎉','🌸','✨','💫'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-item';
    const size = Math.floor(Math.random() * 26) + 12;
    el.style.position = 'absolute';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10vh';
    el.style.fontSize = size + 'px';
    el.style.opacity = Math.random() * 0.9 + 0.6;
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    el.style.pointerEvents = 'none';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(el);

    // falling animation
    const duration = Math.random() * 2200 + 2200;
    el.animate([
      { transform: `translateY(0) rotate(${Math.random()*360}deg)` },
      { transform: `translateY(110vh) rotate(${Math.random()*720}deg)` }
    ], {
      duration,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      delay: Math.random() * 220
    });

    // cleanup
    setTimeout(() => el.remove(), duration + 500);
  }
}