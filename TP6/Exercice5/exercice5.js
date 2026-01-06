document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments (noms en français)
    const banniere = document.querySelector('.banner');
    const imageWf = document.querySelector('.image-wf');

    if (!banniere || !imageWf) return;

    // Écouteur d'événement pour le mouvement de la souris
    banniere.addEventListener('mousemove', (evenement) => {
        // Récupération des dimensions de la bannière
        const rectBanniere = banniere.getBoundingClientRect();

        const xSouris = evenement.clientX - rectBanniere.left - (rectBanniere.width / 2);
        const ySouris = evenement.clientY - rectBanniere.top - (rectBanniere.height / 2);

        const facteurPuissance = 20;

        const deplacementX = (xSouris / facteurPuissance) * -1;
        const deplacementY = (ySouris / facteurPuissance) * -1;

        imageWf.style.transform = `translate(${deplacementX}px, ${deplacementY}px)`;
    });

    banniere.addEventListener('mouseleave', () => {
        imageWf.style.transform = 'translate(0, 0)';
        imageWf.style.transition = 'transform 0.5s ease-out';
    });
});
