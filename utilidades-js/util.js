var Peticion  = (function(){

    var _get = function(url, data){
        return $.ajax({
            type : "GET",
            encoding: "UTF-8",
            url: url,
            data: data
        });
    };

    var _post = function(url, data){
        return $.ajax({
            type : "POST",
            encoding: "UTF-8",
            url: url,
            data: data
        });
    };

    var _sincronizar = function(matriz_llamadas){
        var requests = [];
        for (var i = 0; i < matriz_llamadas.length; i++) {
            var url = matriz_llamadas[i];
            requests.push(_get(url));
        } 
        $.when.apply($, requests).done(function () {
            //console.log(arguments); //muestra el array como un objeto
            var errores = false;
            var n_elementos = 0;
            $.each(arguments, function (i, data) {
                //console.log(data); //data valor devuelto por cada petición ajax   
                data.done(function(datos) {
                    n_elementos++;
                })
                .fail(function(datos) {
                    errores = true;
                });    
                
            });
            if(!errores){
                console.log('Todo bien, se han realizado '+n_elementos+' peticiones.');
            }else{
                console.log('Ha habido problemas con '+ (matriz_llamadas.length - n_elementos) +' peticiones.');
            }      
            
        });
    };

    return {
        get: function(url, data){
            return _get(url, data);
        },
        post: function(url, data){
            return _post(url, data);
        },
        sincronizarPeticionesGet(matriz_url){
            return _sincronizar(matriz_url);
        }     
    }
})();


//Ejemplo de uso post:

//var data = {};
//data.anno = '2019';
//var request = Peticion.post(url, data);

//request.done(function (data) {
//    var datos = JSON.parse(data);
//    if(datos.resultado){ 
//        //Modal de aviso      
//       console.log('La operación se completó correctamente.');
//
//    }else{
//        //Modal de aviso
//        console.log('No pudo completarse la operación');
//    }   
//});

//Ejemplo de uso get:

//request = Peticion.get(url);
//request.done(function(data){
    //var matriz = $.makeArray(JSON.parse(data));
    //var datos = JSON.parse(data);    
//});