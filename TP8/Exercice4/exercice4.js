window.onload = function () {
    const monImage = document.getElementById('monImage');
    const monCanvas = document.getElementById('monCanvas');
    const contexte = monCanvas.getContext('2d');
    const boiteCouleur = document.getElementById('boiteCouleur');
    const texteInfo = document.getElementById('texteInfo');

    // Dessiner l'image dans le canvas une fois chargée
    // Note: l'image est déjà dans le DOM, donc on peut le faire directement si elle est chargée
    // ou attendre l'event load si nécessaire. Ici on est dans window.onload.
    monCanvas.width = monImage.clientWidth;
    monCanvas.height = monImage.clientHeight;
    contexte.drawImage(monImage, 0, 0, monImage.clientWidth, monImage.clientHeight);

    monImage.addEventListener('click', function (evenement) {
        // Obtenir les coordonnées du clic
        const rect = monImage.getBoundingClientRect();
        const x = evenement.clientX - rect.left;
        const y = evenement.clientY - rect.top;

        // Extraire les données du pixel
        const donneesPixel = contexte.getImageData(x, y, 1, 1).data;
        const rouge = donneesPixel[0];
        const vert = donneesPixel[1];
        const bleu = donneesPixel[2];

        // Formatage des couleurs
        const couleurRGB = `rgb(${rouge}, ${vert}, ${bleu})`;
        const couleurHex = rgbVersHex(rouge, vert, bleu);

        // Mise à jour de l'interface
        boiteCouleur.style.backgroundColor = couleurRGB;
        texteInfo.innerHTML = `
            <strong>RGB:</strong> (${rouge}, ${vert}, ${bleu})<br>
            <strong>HEX:</strong> ${couleurHex}
        `;
    });

    function rgbVersHex(r, v, b) {
        const aHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return "#" + aHex(r) + aHex(v) + aHex(b).toUpperCase();
    }
};
