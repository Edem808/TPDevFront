window.onload = function () {
    // ---------------------------------------------------------
    // QUESTION 1 : PETALE
    // ---------------------------------------------------------
    const canvasPetale = document.getElementById('canvasPetale');
    const ctxPetale = canvasPetale.getContext('2d');

    // On dessine un pétale au centre
    dessinerPetale(ctxPetale, 150, 150, 0, 1);


    // ---------------------------------------------------------
    // QUESTION 2 : FLEUR
    // ---------------------------------------------------------
    const canvasFleur = document.getElementById('canvasFleur');
    const ctxFleur = canvasFleur.getContext('2d');

    // On dessine une fleur au centre avec 8 pétales
    dessinerFleur(ctxFleur, 150, 150, 8);


    // ---------------------------------------------------------
    // QUESTION 3 : ANIMATION
    // ---------------------------------------------------------
    const canvasAnim = document.getElementById('canvasAnimation');
    const ctxAnim = canvasAnim.getContext('2d');

    let angleRotation = 0;

    function animer() {
        // Effacer le canvas
        ctxAnim.clearRect(0, 0, canvasAnim.width, canvasAnim.height);

        // Sauvegarder le contexte avant rotation globale
        ctxAnim.save();

        // Déplacer l'origine au centre pour la rotation de toute la fleur
        ctxAnim.translate(150, 150);
        ctxAnim.rotate(angleRotation);

        dessinerFleur(ctxAnim, 0, 0, 8);

        ctxAnim.restore();

        angleRotation += 0.02;

        requestAnimationFrame(animer);
    }

    animer();
};

/**
 * Dessine un pétale centré en (x, y) avec une rotation et une échelle données.
 */
function dessinerPetale(ctx, x, y, angle, echelle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(echelle, echelle);

    // Dessin du pétale (forme de goutte/ellipse allongée)
    ctx.beginPath();
    // On part du centre (0,0)
    ctx.moveTo(0, 0);
    // Courbe de Bézier pour la forme du pétale
    // Point de contrôle 1, Point de contrôle 2, Point final
    ctx.quadraticCurveTo(60, -20, 100, 0);
    ctx.quadraticCurveTo(60, 20, 0, 0);

    ctx.fillStyle = '#ff66cc'; // Rose
    ctx.strokeStyle = '#00ccff'; // Cyan
    ctx.lineWidth = 2;

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

/**
 * Dessine une fleur composée de plusieurs pétales.
 */
function dessinerFleur(ctx, x, y, nombrePetales) {
    const anglePas = (Math.PI * 2) / nombrePetales;

    for (let i = 0; i < nombrePetales; i++) {
        dessinerPetale(ctx, x, y, i * anglePas, 1);
    }
}
