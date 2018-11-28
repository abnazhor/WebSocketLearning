
function iniciar(){
  var elemento=document.getElementById('lienzo');
  lienzo=elemento.getContext('2d');
}
window.addEventListener("load", iniciar, false);
