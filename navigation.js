(function () {
    // 1. Détection du chemin racine
    const scripts = document.getElementsByTagName('script');
    const monScript = scripts[scripts.length - 1];
    const cheminScript = monScript.getAttribute('src');

    let cheminRacine = cheminScript.replace('navigation.js', '');
    if (cheminRacine === '') cheminRacine = './';

    // Données des TPs
    const donneesTPs = [
        {
            titre: "TP 1",
            exercices: [
                { titre: "Exercice 1", lien: "TP1/Exercice1/exo1.html" },
                { titre: "Exercice 2", lien: "TP1/Exercice2/exercice2.html" }
            ]
        },
        {
            titre: "TP 2",
            exercices: [
                { titre: "Exercice 1", lien: "TP2/Exercice1/exercice1.html" },
                { titre: "Exercice 2", lien: "TP2/Exercice2/exercice2.html" },
                { titre: "Exercice 2.3", lien: "TP2/Exercice2-3/exercice2-3.html" },
                { titre: "Exercice 3", lien: "TP2/Exercice3/exercice3.html" }
            ]
        },
        {
            titre: "TP 3",
            exercices: [
                { titre: "Exercice 1", lien: "TP3/Exercice1/exercice1.html" },
                { titre: "Exercice 2", lien: "TP3/Exercice2/exercice2.html" }
            ]
        },
        {
            titre: "TP 4",
            exercices: [
                { titre: "Exercice 1", lien: "TP4/Exercice1/exercice1.html" },
                { titre: "Exercice 2", lien: "TP4/Exercice2/exercice2.html" }
            ]
        },
        {
            titre: "TP 5",
            exercices: [
                { titre: "Exercice 1", lien: "TP5/Exercice1/exercice1.html" },
                { titre: "Exercice 2", lien: "TP5/Exercice2/exercice2.html" },
                { titre: "Exercice 5 (Sticky)", lien: "TP5/Exercice5/exercice5.html" },
                { titre: "Exercice 6 (Imposé)", lien: "TP5/Exercice6/index.html" }
            ]
        },
        {
            titre: "TP 6",
            exercices: [
                { titre: "Exercice 1", lien: "TP6/Exercice1/exercice1.html" },
                { titre: "Exercice 2", lien: "TP6/Exercice2/exercice2.html" },
                { titre: "Exercice 3", lien: "TP6/Exercice3/exercice3.html" },
                { titre: "Exercice 5 (Bannière)", lien: "TP6/Exercice5/exercice5.html" }
            ]
        },
        {
            titre: "TP 7",
            exercices: [
                { titre: "Exercice 3", lien: "TP7/Exercice3/exercice3.html" },
                { titre: "Exercice 4", lien: "TP7/Exercice4/exercice4.html" }
            ]
        },
        {
            titre: "TP 8",
            exercices: [
                { titre: "Exercice 1", lien: "TP8/Exercice1/exercice1.html" },
                { titre: "Exercice 4", lien: "TP8/Exercice4/exercice4.html" }
            ]
        }
    ];

    const styles = `
        .conteneur-nav-flottant {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .bouton-menu {
            background-color: #111;
            color: #fff;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, background-color 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .bouton-menu:hover {
            transform: scale(1.1);
            background-color: #ff4400;
        }

        .menu-principal {
            position: absolute;
            bottom: 60px;
            right: 0;
            background-color: white;
            border: 1px solid #e0e0e0;
            min-width: 200px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateY(10px);
            pointer-events: none;
            transition: all 0.3s ease;
            list-style: none;
            padding: 5px 0;
            border-radius: 4px;
        }

        .conteneur-nav-flottant.actif .menu-principal {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        /* Items du menu */
        .menu-item {
            position: relative;
        }

        .menu-lien {
            display: block;
            padding: 10px 20px;
            text-decoration: none;
            color: #333;
            font-size: 14px;
            transition: background 0.2s;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .menu-lien:hover {
            background-color: #f4f4f4;
            color: #ff4400;
        }

        /* Sous-menu (TPs) */
        .sous-menu {
            position: absolute;
            right: 100%; /* S'affiche à gauche du menu principal */
            bottom: 0;
            background-color: white;
            border: 1px solid #e0e0e0;
            min-width: 180px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            list-style: none;
            padding: 5px 0;
            border-radius: 4px;
            display: none; /* Caché par défaut */
        }

        /* Affichage du sous-menu au survol */
        .menu-item:hover > .sous-menu {
            display: block;
        }
        
        /* Ajustement pour que le sous-menu s'aligne joliment */
        .menu-item-tp:hover > .menu-lien {
             background-color: #f4f4f4;
             color: #ff4400;
        }

        .fleche {
            font-size: 10px;
            margin-left: 10px;
        }

        /* Protection contre les styles globaux des TPs (ex: TP4) */
        .conteneur-nav-flottant a,
        .menu-lien {
            background-image: none !important;
            padding-left: 20px !important; /* Force le padding du menu */
            min-height: auto !important;
        }

        .conteneur-nav-flottant a::before,
        .conteneur-nav-flottant a::after,
        .menu-lien::before,
        .menu-lien::after {
            content: none !important;
            display: none !important;
            background: none !important;
        }
    `;

    const baliseStyle = document.createElement('style');
    baliseStyle.textContent = styles;
    document.head.appendChild(baliseStyle);

    // 3. Construction du DOM
    const conteneur = document.createElement('div');
    conteneur.className = 'conteneur-nav-flottant';

    const bouton = document.createElement('button');
    bouton.className = 'bouton-menu';
    bouton.innerHTML = '+';
    bouton.title = 'Menu Navigation';

    const menuPrincipal = document.createElement('ul');
    menuPrincipal.className = 'menu-principal';

    // Lien Accueil
    const liAccueil = document.createElement('li');
    liAccueil.innerHTML = `<a href="${cheminRacine}index.html" class="menu-lien">Accueil</a>`;
    menuPrincipal.appendChild(liAccueil);

    // Lien Liste des TPs (Hovérable)
    const liTPs = document.createElement('li');
    liTPs.className = 'menu-item';

    // Le titre "Travaux Pratiques" avec une flèche
    const lienTPs = document.createElement('a');
    lienTPs.href = '#';
    lienTPs.className = 'menu-lien';
    lienTPs.innerHTML = 'Les TP <span class="fleche">◀</span>';
    liTPs.appendChild(lienTPs);

    // Création de la liste des TPs (Sous-menu niveau 1)
    const sousMenuTPs = document.createElement('ul');
    sousMenuTPs.className = 'sous-menu';

    donneesTPs.forEach(tp => {
        const liTp = document.createElement('li');
        liTp.className = 'menu-item menu-item-tp';

        const lienTp = document.createElement('a');
        lienTp.href = '#';
        lienTp.className = 'menu-lien';
        lienTp.innerHTML = `${tp.titre} <span class="fleche">◀</span>`;
        liTp.appendChild(lienTp);

        // Sous-menu des exercices (Niveau 2)
        const sousMenuExos = document.createElement('ul');
        sousMenuExos.className = 'sous-menu';

        tp.exercices.forEach(exo => {
            const liExo = document.createElement('li');
            liExo.innerHTML = `<a href="${cheminRacine}${exo.lien}" class="menu-lien">${exo.titre}</a>`;
            sousMenuExos.appendChild(liExo);
        });

        liTp.appendChild(sousMenuExos);
        sousMenuTPs.appendChild(liTp);
    });

    liTPs.appendChild(sousMenuTPs);
    menuPrincipal.appendChild(liTPs);


    conteneur.appendChild(menuPrincipal);
    conteneur.appendChild(bouton);
    document.body.appendChild(conteneur);

    // 4. Interaction
    bouton.addEventListener('click', () => {
        conteneur.classList.toggle('actif');
        bouton.innerHTML = conteneur.classList.contains('actif') ? '×' : '+';
    });

    document.addEventListener('click', (e) => {
        if (!conteneur.contains(e.target)) {
            conteneur.classList.remove('actif');
            bouton.innerHTML = '+';
        }
    });

})();
