const apiKay = '3ptHQLAjuYlfN1FQVw03bWEaA0YqcwNf';
let lista = [] // TOTAL DE LOS GIFOS ENCONTRADOS
let listaMostrar = [] // SOLO LOS DOCE PRIMEROS
let listaFavoritos = [];

// ELIMINAR VER MAS
const btnVerMas = document.getElementById('btn-ver-mas');
btnVerMas.style.display = 'none';

function search() {
    indexListaMostrar = 1;
    mostrarVerMas();
    eliminarBusqueda();
    const search = document.getElementById('search-input').value;
    const user = fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKay}&q=${search}`);
    user.then(res => res.json())
        .then(data => {
            // aca ya eliminamos lo que habia

            lista = data.data;
            if (data.data.length < 13) {
                listaMostrar = data.data;
            } else {
                listaMostrar = data.data.slice(0, 12);
            }
            modificarTitulos();
            agregarElementosBusqueda();
        }).catch(error => {
            console.error('Error');
        })
}

function eliminarVerMas() {
    const btnVerMas = document.getElementById('btn-ver-mas');
    btnVerMas.style.display = 'none';
}

function mostrarVerMas() {
    const btnVerMas = document.getElementById('btn-ver-mas');
    btnVerMas.style.display = 'flex';
}



function modificarTitulos() {
    const divTrending = document.getElementById('div-trending');
    divTrending.style.display = 'none';
    const searchTitulo = document.getElementById('search-text-select');
    const search = document.getElementById('search-input').value;
    searchTitulo.innerHTML = search;
}


searchInput = document.getElementById('search-input');
searchInput.addEventListener("keyup", (evento) => {
    if (evento.target.value.length === 0) {
        eliminarSuggestion();
        document.getElementById('img-search').src = '/img/icon-search.svg';
        return;
    } else {

        document.getElementById('img-search').src = '/img/close.svg';
        let imgSearch = document.getElementById('img-search').src
    }
    if (evento.keyCode === 13) {
        this.search();
    } else {
        eliminarSuggestion();
        searchSuggestion();
    }
});

function clearSearch() {
    const searchChange = document.getElementById('search-input');
    searchChange.innerHTML = '';
    searchChange.value = '';
    eliminarBusqueda();
    eliminarSuggestion();
    eliminarVerMas();
    document.getElementById('div-trending').style.display = 'flex';
    document.getElementById('img-search').src = '/img/icon-search.svg';
    document.getElementById('search-text-select').style.display = 'none';
}

let mostrarSuggestion = 0;

function searchSuggestion() {

    const searchs = document.getElementById('search-input').value;
    const suggestion = fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKay}&q=${searchs}`)
    eliminarSuggestion();
    suggestion.then(res => res.json())
        .then(data => {
            data.data.forEach((element) => {
                var sug = document.createElement("h4");
                sug.innerHTML = element.name;
                sug.onclick = function (ev) {
                    const searchChange = document.getElementById('search-input');
                    searchChange.innerHTML = ev.target.innerHTML;
                    searchChange.value = ev.target.innerHTML;
                    eliminarSuggestion();
                    search();
                };
                sug.style.opacity = '22%';
                sug.style.cursor = 'pointer';
                document.getElementById("suggetion-search").appendChild(sug);
            });

        })
}

let indexListaMostrar = 1;

function verMas() {
    eliminarBusqueda();
    listaMostrar = lista.slice(12 * indexListaMostrar, 12 * (indexListaMostrar + 1));
    agregarElementosBusqueda(listaMostrar);
    indexListaMostrar++;
}

function eliminarBusqueda() {
    const containerGifos = document.getElementById("img-gifos")
    for (let i = 0; i <= 12; i++) {
        if (containerGifos.childNodes.length > 0)
            containerGifos.removeChild(containerGifos.childNodes[0]);
    }
}

function eliminarSuggestion() {
    const containerGifos = document.getElementById("suggetion-search")
    while (containerGifos.childNodes.length > 0) {
        containerGifos.removeChild(containerGifos.childNodes[0]);
    }
}

function agregarElementosBusqueda() {
    listaMostrar.forEach((element, i) => {

        var divContenedor = document.createElement("div");
        divContenedor.classList.add('container-tarjeta');

        var divIcon = document.createElement("div");
        divIcon.classList.add('img-iconos');


        // IMG ICON X3
        var iconFav = document.createElement("img");
        iconFav.classList.add('icon-fav');
        iconFav.classList.add('icon-tarjeta');
        iconFav.setAttribute('id', element.images.original.url);
        iconFav.onclick = function (ev) {
            clickIconFav(ev);
        };

        var iconDow = document.createElement("img");
        iconDow.classList.add('icon-dow');
        iconDow.classList.add('icon-tarjeta');
        iconDow.setAttribute('id', element.images.downsized.url);
        iconDow.onclick = function (ev) {
            clickIconDow(ev.target.id);
        };

        var iconMax = document.createElement("img");
        iconMax.classList.add('icon-max');
        iconMax.classList.add('icon-tarjeta');
        iconMax.setAttribute('id', `img-max-${i}`);
        iconMax.onclick = function (ev) {
            clickIconMax(ev);
        };
        // IMG
        var node = document.createElement("img");
        node.setAttribute('src', element.images.original.url);
        node.setAttribute('id', `img-gifo-${i}`);
        node.classList.add('img_fav');

        // ARMAR BLOQUE
        divIcon.appendChild(iconFav);
        divIcon.appendChild(iconDow);
        divIcon.appendChild(iconMax);
        divContenedor.appendChild(node);
        divContenedor.appendChild(divIcon);
        document.getElementById("img-gifos").appendChild(divContenedor);
    });
}


function clickIconFav(ev) {
    listaFavoritos.push(ev.target.id);
    localStorage.setItem('listFavoritos', JSON.stringify(listaFavoritos));
}

async function clickIconDow(id) {
    console.log(id);
  let a = document.createElement('a');
  let response = await fetch(id);
  let file = await response.blob();
  a.download = 'myGif';
  a.href = window.URL.createObjectURL(file);
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
  a.click();
}

function clickIconMax(ev) {
    console.log('max')
    const header = document.getElementById('header'); 
    const max = document.getElementById('max');
    const mainPag = document.getElementById('main-pag');
    const sectionGifos = document.getElementById('sectionGifos');
    const footer = document.getElementById('footer');
    const fovoritesPage = document.getElementById('favorites-page');
    
    header.style.display = 'none';
    max.style.display = 'block';
    mainPag.style.display = 'none';
    sectionGifos.style.display = 'none';
    footer.style.display = 'none';
    fovoritesPage.style.display = 'none';

}

function closeMax(){
    console.log('closemaxxx');
    const header = document.getElementById('header'); 
    const max = document.getElementById('max');
    const mainPag = document.getElementById('main-pag');
    const sectionGifos = document.getElementById('sectionGifos');
    const footer = document.getElementById('footer');
    const fovoritesPage = document.getElementById('favorites-page');
    
    header.style.display = 'block';
    max.style.display = 'none';
    mainPag.style.display = 'block';
    sectionGifos.style.display = 'block';
    footer.style.display = 'block';

}