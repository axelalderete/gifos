let recorder;
function createGifo() {

    console.log('createGifoOOOOOO')
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
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        invokeSaveAsDialog(blob);
    });
}

function subirGif(){
    agregarElementosFavoritos();
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

// function reinicio() {
//   clearInterval(control);
//   segundos = 0;
//   minutos = 0;
//   document.getElementById('Tiempo').innerHTML = ("0" + minutos + ":" + "0" + segundos);
// }

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