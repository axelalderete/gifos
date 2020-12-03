function createGifo(){
    
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

function comenzar(){
    const comenzar = document.getElementById('comenzar');
    const paso1 = document.getElementById('paso1');
    const h3 = document.getElementById('h3-crear-gifos');
    const p = document.getElementById('p-crear-gifos');
    p.innerHTML = 'El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.'
    p.style.color = 'black';
    p.style.fontSize = '12px';
    h3.innerHTML = '¿Nos das acceso <br> a tu cámara? <br>';
    paso1.style.background = '#572EE5';
    paso1.style.color = 'white';
    comenzar.style.display = 'none';
}