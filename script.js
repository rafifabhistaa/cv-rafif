// Dark mode (ingat pilihan, default ikut setelan perangkat)
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = dark ? 'dark' : 'light';

document.getElementById('theme').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Efek ngetik
const words = ['web development', 'system analysis', 'SQL & databases', 'new things every day'];
const el = document.getElementById('typed');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (still) {
  el.textContent = words[0];
} else {
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 80);
  })();
}

// Muncul pelan-pelan saat di-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((n) => io.observe(n));
