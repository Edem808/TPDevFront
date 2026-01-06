window.onload = function () {
    const canvas = document.getElementById('monCanvas');
    const contexte = canvas.getContext('2d');

    // État initial
    let largeur = 50;
    let hauteur = 50;
    let couleurIndex = 0; // 0: jaune, 1: rouge, 2: bleu, 3: vert
    const couleurs = ['yellow', 'red', 'blue', 'green'];
    let estPlein = true; // true: fill, false: stroke
    let estVisible = true;

    // Position initiale
    const x = 50;
    const y = 50;

    // Fonction de dessin principale
    function dessiner() {
        // Effacer le canvas
        contexte.clearRect(0, 0, canvas.width, canvas.height);

        if (estVisible) {
            contexte.beginPath();

            if (estPlein) {
                contexte.fillStyle = couleurs[couleurIndex];
                contexte.fillRect(x, y, largeur, hauteur);
            } else {
                contexte.strokeStyle = couleurs[couleurIndex];
                contexte.lineWidth = 2; // Épaisseur du trait pour visible
                contexte.strokeRect(x, y, largeur, hauteur);
            }
        }
    }

    // Gestionnaires d'événements
    document.getElementById('btnLargeur').addEventListener('click', function () {
        largeur += 10;
        if (largeur > 200) largeur = 10;
        dessiner();
    });

    document.getElementById('btnHauteur').addEventListener('click', function () {
        hauteur += 10;
        if (hauteur > 200) hauteur = 10;
        dessiner();
    });

    document.getElementById('btnCouleur').addEventListener('click', function () {
        couleurIndex = (couleurIndex + 1) % couleurs.length;
        dessiner();
    });

    document.getElementById('btnStyle').addEventListener('click', function () {
        estPlein = !estPlein;
        dessiner();
    });

    document.getElementById('btnVisib').addEventListener('click', function () {
        estVisible = !estVisible;
        dessiner();
    });

    // Dessin initial
    dessiner();
};
