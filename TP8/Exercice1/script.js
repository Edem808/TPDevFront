window.onload = function () {
    const canvas = document.getElementById('monCanvas');
    const contexte = canvas.getContext('2d');

    const imageFond = new Image();
    imageFond.src = 'imgs/pelouse.png';

    const imagePerso = new Image();
    imagePerso.src = 'imgs/sprites.png';


    const tailleSource = 128;
    const tailleDest = 75;

    let persoX = 224;
    let persoY = 224;

    // Direction: 0=Bas, 1=Haut, 2=Gauche, 3=Droite (row)
    let direction = 0;
    let etape = 0; // frame (0 à 3)

    function dessiner() {
        // Dessiner le fond avec un motif répété (pattern)
        const motif = contexte.createPattern(imageFond, 'repeat');
        contexte.fillStyle = motif;
        contexte.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner le sprite
        contexte.drawImage(
            imagePerso,
            etape * tailleSource, direction * tailleSource,
            tailleSource, tailleSource,
            persoX, persoY,
            tailleDest, tailleDest
        );
    }

    imagePerso.onload = dessiner;
    imageFond.onload = dessiner;

    window.addEventListener('keydown', function (evenement) {
        const pas = 10;

        if (evenement.key === 'ArrowDown') {
            direction = 0;
            if (persoY + pas <= canvas.height - tailleDest) persoY += pas;
        } else if (evenement.key === 'ArrowUp') {
            direction = 1;
            if (persoY - pas >= 0) persoY -= pas;
        } else if (evenement.key === 'ArrowLeft') {
            direction = 2;
            if (persoX - pas >= 0) persoX -= pas;
        } else if (evenement.key === 'ArrowRight') {
            direction = 3;
            if (persoX + pas <= canvas.width - tailleDest) persoX += pas;
        } else {
            return;
        }

        etape = (etape + 1) % 4;
        dessiner();
    });
};
