
  const scrollZone = document.getElementById('scroll');
  const helice = document.querySelector('#helice img');

  scrollZone.addEventListener('scroll', () => {
    // rotation basée sur la position de défilement du conteneur
    const rotation = scrollZone.scrollTop / 2;
    helice.style.transform = `rotate(${rotation}deg)`;
  });

