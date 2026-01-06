document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('retourEnHaut');
    if (button) {
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
