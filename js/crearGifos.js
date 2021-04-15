// creamos la lista de gifos
let listaMisGifos = [];
//variable stream
let recorder;
let stream;
function createGifo() {
  const crearGifos = document.getElementById('crear-gifos');
  const mainPag = document.getElementById('main-pag');
  const sectionGifos = document.getElementById('sectionGifos');
  const fovoritesPage = document.getElementById('favorites-page');
  const divGif = document.getElementById('gifos-page');
  divGif.style.display = 'none';
  crearGifos.style.display = 'flex';
  mainPag.style.display = 'none';
  sectionGifos.style.display = 'none';
  fovoritesPage.style.display = 'none';
}

async function comenzar() {
  // reinicio();
  const comenzar = document.getElementById('btn-comenzar');
  const grabar = document.getElementById('btn-grabar');
  const paso1 = document.getElementById('paso1');
  const paso2 = document.getElementById('paso2');
  const h3 = document.getElementById('h3-crear-gifos');
  const p = document.getElementById('p-crear-gifos');
  p.innerHTML = 'El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.'
  p.style.color = 'black';
  p.style.fontSize = '12px';
  h3.innerHTML = '¿Nos das acceso <br> a tu cámara? <br>';
  paso1.classList.toggle('paso-on');
  comenzar.classList.toggle('ocultar');
  grabar.classList.toggle('ocultar');
  try {

    const constraints = { audio: false, video: true }
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    h3.style.display = 'none';
    p.style.display = 'none';
    paso1.classList.toggle('paso-off');
    paso2.classList.toggle('paso-on');
    const videoGifo = document.getElementById('video-gifo')
    videoGifo.classList.toggle('ocultar');
    videoGifo.srcObject = stream;
    videoGifo.play();

    // console.log(stream);
    /* use the stream */
  } catch (err) {
    console.log(err);
    /* handle the error */
  }
}


async function grabar() {
  const grabar = document.getElementById('btn-grabar');
  const finalizar = document.getElementById('btn-finalizar');
  finalizar.classList.toggle('ocultar');
  grabar.classList.toggle('ocultar');
  const constraints = { audio: false, video: true }
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  inicio();
  recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 480,
    height: 320,
    hidden: 240,
  });
  recorder.startRecording();
  recorder.stream = stream;
}

function finalizar() {
  parar();
  const repetir = document.getElementById('contenedor-repetir');
  const Tiempo = document.getElementById('contenedor');
  Tiempo.classList.toggle('ocultar');
  repetir.classList.toggle('ocultar');
  const finalizar = document.getElementById('btn-finalizar');
  const subirGif = document.getElementById('btn-subir-gif');
  finalizar.classList.toggle('ocultar');
  subirGif.classList.toggle('ocultar');
  const paso3 = document.getElementById('paso3');
  const paso2 = document.getElementById('paso2');
  paso2.classList.toggle('paso-off');
  paso3.classList.toggle('paso-on');
  const videoGifo = document.getElementById('video-gifo');
  const imgVideoGif = document.getElementById('img-video-gif');
  videoGifo.classList.toggle('ocultar');
  imgVideoGif.classList.toggle('ocultar');


  recorder.stopRecording(function () {
    console.log(stream);
    recorder.stream.stop();
    imgVideoGif.src = URL.createObjectURL(recorder.getBlob());

  });
}

function subirGif() {
  let form = new FormData();
  // mostrar carga o subiendo del gif
  const contenedorCargando = document.getElementById('contenedor-cargando');
  contenedorCargando.classList.toggle('ocultar');
  const subirGif = document.getElementById('btn-subir-gif');
  subirGif.classList.toggle('ocultar');
  const repetir = document.getElementById('contenedor-repetir');
  repetir.classList.toggle('ocultar');

  // empieza la llamada al servicio para subir el gift
  form.append('file', recorder.getBlob(), 'myGif.gif');
  fetch(`https://upload.giphy.com/v1/gifs?api_key=${ApiKey}`, {
    method: "POST",
    body: form
  })
    .then(response => {
      return response.json();
    }).then(data => {
      fetch("https://api.giphy.com/v1/gifs/" + data.data.id + `?&api_key=${ApiKey}`)
        .then(response => {
          return response.json();
        }).then(obj => {
          let listaMisGifos = [];
          urlGif = obj.data.images.original.url;
          // obtenemos la lista ya cargada de los gifos
          listaGuardada = JSON.parse(localStorage.getItem('misGifos'));
          listaMisGifos = listaGuardada ? listaGuardada : [];
          // agregamos el nuevo
          listaMisGifos.push(urlGif);
          // actualizamos el localstorage
          localStorage.setItem('misGifos', JSON.stringify(listaMisGifos));
        });
      // mostramos mensaje de exito y permitimos descargar
      const contenedorListo = document.getElementById('contenedor-listo');
      contenedorListo.classList.toggle('ocultar');
      contenedorCargando.classList.toggle('ocultar');

    })
    .catch(err => {
      console.log(err);
    });
}
function copyGifoCreado() {
  navigator.clipboard.writeText(urlGif).then(function () {
    alert('URL copiada en el portapapeles');
  }, function () {
    alert('no se a podido copiar');
  });
}

function donwloadGifoCreado() {
  // GUARDAR EN MI PC
  let blob = recorder.getBlob();
  invokeSaveAsDialog(blob);
}

function repetirGif() {
  const grabar = document.getElementById('btn-grabar');
  const subirGif = document.getElementById('btn-subir-gif');
  grabar.classList.toggle('ocultar');
  subirGif.classList.toggle('ocultar');
  const paso3 = document.getElementById('paso3');
  const paso2 = document.getElementById('paso2');
  paso3.classList.toggle('paso-off');
  paso2.classList.toggle('paso-off');
  segundos = 0;
  const repetir = document.getElementById('contenedor-repetir');
  const Tiempo = document.getElementById('contenedor');
  Tiempo.classList.toggle('ocultar');
  repetir.classList.toggle('ocultar');
  const videoGifo = document.getElementById('video-gifo');
  const imgVideoGif = document.getElementById('img-video-gif');
  videoGifo.classList.toggle('ocultar');
  imgVideoGif.classList.toggle('ocultar');
}


// cronometro -------------------------------------------

var segundos = 0;
var minutos = 0;

function inicio() {
  console.log('inicio')
  control = setInterval(cronometro, 1000);
}

function parar() {
  clearInterval(control);
}


function cronometro() {

  segundos += 1;

  if (segundos == 60) {

    segundos = 0;
    minutos += 1;
  }

  if (segundos < 10 && minutos < 10) {
    document.getElementById('Tiempo').innerHTML = ("0" + minutos + ":" + "0" + segundos);
  } else if (segundos >= 10 && minutos < 10) {
    document.getElementById('Tiempo').innerHTML = ("0" + minutos + ":" + segundos);
  } else if (segundos < 10 && minutos > 10) {
    document.getElementById('Tiempo').innerHTML = (+minutos + ":" + "0" + segundos);
  } else {
    document.getElementById('Tiempo').innerHTML = (minutos + ":" + segundos);
  }
}


//crear y borrar gifos--------------


function agregarElementosMisGifos(lista) {
  if (!lista) return;
  lista.forEach((element, i) => {

    var divContenedor = document.createElement("div");
    divContenedor.classList.add('container-tarjeta');

    var divIcon = document.createElement("div");
    divIcon.classList.add('img-iconos');


    // IMG ICON X3 tarjeta
    //icon fav
    var iconFav = document.createElement("img");
    iconFav.classList.add('icon-delete');
    iconFav.classList.add('icon-tarjeta');
    iconFav.setAttribute('id', element);
    iconFav.onclick = function (ev) {
      clickDeleteGifos(ev.target.id);
      eliminarFavoritos();
      clickDeleteFav();
    };
    // icono descargar  
    var iconDow = document.createElement("img");
    iconDow.classList.add('icon-dow');
    iconDow.classList.add('icon-tarjeta');
    iconDow.setAttribute('id', element);
    iconDow.onclick = function (ev) {
      clickIconDow(ev.target.id);
    };
    // icono maxxx
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
    document.getElementById("img-mis-gifos").appendChild(divContenedor);
  });
}

function clickDeleteGifos(id) {
  const nuevaLista = listaMisGifos.filter(element => {
    return element !== id
  });
  eliminarFavoritos();
  localStorage.setItem('listFavoritos', JSON.stringify(nuevaLista));
  listaMisGifos = JSON.parse(localStorage.getItem('listFavoritos'));
  agregarElementosFavoritos();
}