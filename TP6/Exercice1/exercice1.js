
const container = document.getElementById('rideau');
const left = container.querySelector('.rid.left');
const right = container.querySelector('.rid.right');

const DURATION = 700;
const EASING = function (t) { return 1 - Math.pow(1 - t, 3) };

let anim = null;
function animaterids(open) {
    cancelAnimationFrame(anim);
    const start = performance.now();
    const from = open ? 0 : 1; // 0 = fermé, 1 = ouvert
    const to = open ? 1 : 0;


    // pour éviter transitions CSS conflit
    container.classList.add('open');


    function frame(now) {
        const t = Math.min(1, (now - start) / DURATION);
        const k = EASING(t);
        const progress = from + (to - from) * k;

        const leftX = -100 * progress;
        const rightX = 100 * progress;

        left.style.transform = `translateX(${leftX}%)`;
        right.style.transform = `translateX(${rightX}%)`;


        if (t < 1) { anim = requestAnimationFrame(frame); }
        else { container.classList.remove('open'); }
    }
    anim = requestAnimationFrame(frame);
}

container.addEventListener('mouseenter', () => animaterids(true));
container.addEventListener('focus', () => animaterids(true));
container.addEventListener('mouseleave', () => animaterids(false));

left.style.transform = 'translateX(0)';
right.style.transform = 'translateX(0)';


