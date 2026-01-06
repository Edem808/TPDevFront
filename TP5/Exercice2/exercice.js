window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight;
    const winHeight = window.innerHeight;

    const scrollPercent = scrollTop / (docHeight - winHeight);

    const safePercent = Math.min(Math.max(scrollPercent, 0), 1);
    const redValue = Math.floor(safePercent * 255);
    document.body.style.backgroundColor = `rgb(${redValue}, 0, 0)`;
});
