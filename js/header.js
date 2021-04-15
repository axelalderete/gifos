let listaFav = [];

function goToMenu() {
    const divMain = document.getElementById('main-pag');
    const divFav = document.getElementById('favorites-page');
    const divGif = document.getElementById('gifos-page');
    const crearGifos = document.getElementById('crear-gifos');
    const sectionGifos = document.getElementById('sectionGifos');
    sectionGifos.style.display = 'block';
    crearGifos.style.display = 'none';
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
    modeDark.innerText = modeDark.innerText === 'MODO DIURNO' ? 'MODO NOCTURNO' : 'MODO DIURNO';
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
    const crearGifos = document.getElementById('crear-gifos');
    crearGifos.style.display = 'none';
    divMain.style.display = 'none';
    divFav.style.display = 'block';
    divGif.style.display = 'none';
    listaFav = JSON.parse(localStorage.getItem('listFavoritos'));
    eliminarFavoritos();
    agregarElementosFavoritos()
}

function eliminarFavoritos() {
    const containerGifos = document.getElementById("img_favoritos");
    for (let i = 0; containerGifos.childNodes.length; i++) {
        containerGifos.removeChild(containerGifos.childNodes[0]);
    }
}

function agregarElementosFavoritos() {
    listaFav.forEach((element, i) => {

        var divContenedor = document.createElement("div");
        divContenedor.classList.add('container-tarjeta');

        var divIcon = document.createElement("div");
        divIcon.classList.add('img-iconos');


        // IMG ICON X3
        var iconFav = document.createElement("img");
        iconFav.classList.add('icon-favoritos');
        iconFav.classList.add('icon-tarjeta');
        iconFav.setAttribute('id', element);
        iconFav.onclick = function (ev) {
            clickDeleteFav(ev.target.id);
        };

        var iconDow = document.createElement("img");
        iconDow.classList.add('icon-dow');
        iconDow.classList.add('icon-tarjeta');
        iconDow.setAttribute('id', element);
        iconDow.onclick = function (ev) {
            clickIconDow(ev.target.id);
        };

        var iconMax = document.createElement("img");
        iconMax.classList.add('icon-max');
        iconMax.classList.add('icon-tarjeta');
        iconMax.setAttribute('id', element);
        iconMax.onclick = function (ev) {
            clickIconMax(ev.target.id);
        };
        // IMG
        var node = document.createElement("img");
        node.setAttribute('src', element);
        node.setAttribute('id', `img-gifo-${i}`);
        node.classList.add('img_fav');

        // ARMAR BLOQUE
        divIcon.appendChild(iconFav);
        divIcon.appendChild(iconDow);
        divIcon.appendChild(iconMax);
        divContenedor.appendChild(node);
        divContenedor.appendChild(divIcon);
        document.getElementById("img_favoritos").appendChild(divContenedor);
    });
}



function goToMyGifos() {
    const divMain = document.getElementById('main-pag');
    const divGif = document.getElementById('gifos-page');
    const divFav = document.getElementById('favorites-page');
    const crearGifos = document.getElementById('crear-gifos');
    crearGifos.style.display = 'none';
    divMain.style.display = 'none';
    divGif.style.display = 'block';
    divFav.style.display = 'none';
    console.log('IR A LA PAGINA GIFOS');
    listaMisGifos = JSON.parse(localStorage.getItem('misGifos'));
    agregarElementosMisGifos(listaMisGifos);

}

function clickDeleteFav(id) {
    const nuevaLista = listaFav.filter(element => {
        return element !== id
    });
    eliminarFavoritos();
    localStorage.setItem('listFavoritos', JSON.stringify(nuevaLista));
    listaFav = JSON.parse(localStorage.getItem('listFavoritos'));
    agregarElementosFavoritos();
}