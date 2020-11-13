function goToMenu() {
    const divMain = document.getElementById('main-pag');
    const divFav = document.getElementById('favorites-page');
    const divGif = document.getElementById('gifos-page');
    divMain.style.display = 'block';
    divFav.style.display = 'none';
    divGif.style.display = 'none';
    console.log('IR A LA PAGINA PRINCIPAL');
}

function darkMode() {
    const sectionDark = document.getElementById('sectionGifos');
    const divHeader = document.getElementById('nav-header');
    const divBody = document.getElementById('body-gifos');
    const modeDark = document.getElementById('mode_dark');
    console.log(modeDark);
    modeDark.innerText = modeDark.innerText === 'MODO DIURNO' ? 'MODO NOCTURNO' :'MODO DIURNO';
    sectionDark.classList.toggle('dark-mode-section');
    divBody.classList.toggle('dark-mode-body');
    divHeader.classList.toggle('dark-mode-nav');
    darkModeList(document.getElementsByTagName('h2'));
    darkModeList(document.getElementsByTagName('h1'));
    darkModeList(document.getElementsByTagName('h3'));
    darkModeList(document.getElementsByTagName('h4'));
    darkModeList(document.getElementsByTagName('a'));
    let iconoGifos = document.getElementById('iconoGifos').src;
    if (iconoGifos.indexOf('logo-desktop.svg') != -1) {
      document.getElementById('iconoGifos').src = 'img/Logo-modo-noc.svg';
    } else
      document.getElementById('iconoGifos').src = 'img/logo-desktop.svg';
}

function darkModeList(list) {
    for (i = 0; i < list.length; i++) {
        list[i].classList.toggle('dark-mode-letter');
    }
}

function goToFavorites() {
    const divMain = document.getElementById('main-pag');
    const divFav = document.getElementById('favorites-page');
    const divGif = document.getElementById('gifos-page');
    divMain.style.display = 'none';
    divFav.style.display = 'block';
    divGif.style.display = 'none';
}

function goToMyGifos() {
    const divMain = document.getElementById('main-pag');
    const divGif = document.getElementById('gifos-page');
    const divFav = document.getElementById('favorites-page');
    divMain.style.display = 'none';
    divGif.style.display = 'block';
    divFav.style.display = 'none';
    console.log('IR A LA PAGINA GIFOS');
}

function createGifo() {
    console.log('createGito');
}