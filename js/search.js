const apiKay = '3ptHQLAjuYlfN1FQVw03bWEaA0YqcwNf';
let lista = [] // TOTAL DE LOS GIFOS ENCONTRADOS
let listaMostrar = [] // SOLO LOS DOCE PRIMEROS
function search() {
    indexListaMostrar = 1;
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
            agregarElementosBusqueda();
        }).catch(error => {
            console.error('Error');
        })
}
searchInput = document.getElementById('search-input');
searchInput.addEventListener("keydown", (evento) => {
    if (evento.keyCode === 13) {
        this.search();
    }
});

let indexListaMostrar = 1;

function verMas() {
    eliminarBusqueda();
    listaMostrar = lista.slice(12 * indexListaMostrar, 12* (indexListaMostrar + 1));
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

function agregarElementosBusqueda(){
    listaMostrar.forEach((element, i) => {
        var node = document.createElement("img");
        node.setAttribute('src', element.images.original.url);
        node.setAttribute('id', `img-gifo-${i}`);
        node.classList.add('img_fav');
        document.getElementById("img-gifos").appendChild(node);
    });
}
