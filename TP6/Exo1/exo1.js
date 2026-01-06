
const container = document.getElementById('rideau');
const left = container.querySelector('.rid.left');
const right = container.querySelector('.rid.right');


// Paramètres
const DURATION = 700; // durée en ms pour l'ouverture / fermeture
const EASING = function(t){return 1 - Math.pow(1 - t, 3)}; // easing cubic-out


let anim = null;
function animaterids(open){
cancelAnimationFrame(anim);
const start = performance.now();
const from = open ? 0 : 1; // 0 = fermé, 1 = ouvert
const to = open ? 1 : 0;


// pour éviter transitions CSS conflit
container.classList.add('open');


function frame(now){
const t = Math.min(1, (now - start)/DURATION);
const k = EASING(t);
const progress = from + (to - from) * k; // 0..1


// transformer en translation : 0 => panneaux couvrent, 1 => panneaux hors zone
const leftX = -100 * progress; // -100% = déplacé complètement à gauche
const rightX = 100 * progress; // 100% = déplacé complètement à droite


left.style.transform = `translateX(${leftX}%)`;
right.style.transform = `translateX(${rightX}%)`;


if(t < 1){ anim = requestAnimationFrame(frame); }
else { container.classList.remove('open'); }
}
anim = requestAnimationFrame(frame);
}


// écouteurs : entrée / sortie
container.addEventListener('mouseenter', ()=> animaterids(true));
container.addEventListener('focus', ()=> animaterids(true));
container.addEventListener('mouseleave', ()=> animaterids(false));



// initial state (fermée)
left.style.transform = 'translateX(0)';
right.style.transform = 'translateX(0)';


