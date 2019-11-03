$(document).ready(function () {
    App.load();   
});

/**
 * Hora del cliente
 *
 */
let App = (function () {

    let _hora
      
    let contador = function () {
      if ($('.muestra-hora').length) {
        _hora = new Date();
        _actualizaContador();
        window.setInterval(function () {
          _actualizaContador();
        }, 1000);
       
      }
    };
  
    let _actualizaContador = function () {
      let fechaHora = moment(_hora);
      $('.muestra-hora').html(fechaHora.format('DD/MM/YYYY HH:mm:ss'));
      _hora = new Date(fechaHora.add(1, 'second'));
    };
    
  
    return {
      load: function () {
        contador();       
      },  
    };
  })();
  