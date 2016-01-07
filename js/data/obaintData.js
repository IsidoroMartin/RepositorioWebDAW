/*
 * Autor= Juan José Ramírez Sánchez
 * Fecha= 10 de dic. de 2015
 * Licencia=gp130
 * Version=1.0
 * Descripcion = Obtención de datos y lógica de filtrado y paginción de la página web de rutas
 *
 *
 Copyright (C) 2015 Juan José Ramírez Sánchez

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*Un ejemplo de como pedir JSON y convertirlos (Este va a ser el único JSON existente asiq no problemo!*/
var listaRutas = "";

//Obtengo los divs que mostrarán las rutas.
var divsDeRutas;

//Tengo una variable global que almacena las rutas filtradas
var listaFiltered;

var divPaginacion = null;

//Indice del array listaFiltered para saber que rutas estoy mostrando en este momento
var indicePosMostrar = 0;

window.onload = function init() {
    obtenerRutas(); //obtengo las rutas y van a la variable lista rutas
    divsDeRutas = document.getElementsByClassName("rutas-posibles"); //obtengo los div de rutas (Donde las rutas se irán mostrando)
    pintarRutas(obtenerRutasPopulares()); //Pinto las rutas más populares
};

/*
 * Con esta función obtenemos y convertimos el fichero JSON con las rutas en un
 * array.
 */
function obtenerRutas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            /* Obtengo un array con las rutas */
            listaRutas = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET", "js/data/rutas.json", false);
    xhttp.send();
}

function obtenerRutasPopulares() {
    //Me creo una lista donde añadiré las rutas populares
    var listaFiltrada = [];

    for (var i = 0; i < listaRutas.length; i++) {
        if (listaRutas[i].popular) {
            listaFiltrada.push(listaRutas[i]);
        }
    }
    return listaFiltrada;
}

/**
 * Esta función comprueba si hay alguna ruta que coincide en la ruta buscada por
 * el usuario, si es así la devuelve.
 */
function buscarRutaPorNombre(listaRutas, inputUser) {
    //Me creo una lista donde añadiré las rutas que coinciden con el input:
    var listaFiltrada = [];
    // Me creo una expresión regular con lo que ha introducido el usuario
    var regex = new RegExp(inputUser, "i");
    // Por cada ruta que tiene más de un caracter busco si hay alguna
    // coincidencia, si la hay devuelvo el primer resultado
    for (var i = 0; i < listaRutas.length; i++) {
        if (inputUser.length > 0) {
            if (listaRutas[i].nombre.search(regex) != -1) {
                listaFiltrada.push(listaRutas[i]);
            }
        }
    }
    return listaFiltrada;
}


/*
 * Esta función devuelve una lista de rutas que cumplan la dificultad
 * parametrizada.
 */
function filtrarRutasPorDificultad(listaRutas, dificultad) {
    var rutas = [];
    for (var i = 0; i < listaRutas.length; i++) {
        if (listaRutas[i].dificultad == dificultad) {
            rutas.push(listaRutas[i]);
        }
    }
    return rutas;
}

/* Dado un tipo devuelve una lista de rutas */
function filtrarRutasPorTipo(listaRutas, tipoRuta) {
    var rutas = [];
    for (var i = 0; i < listaRutas.length; i++) {
        if (listaRutas[i].tipo == tipoRuta) {
            rutas.push(listaRutas[i]);
        }
    }
    return rutas;
}

/* Dada una distancia devuelve la lista de rutas que cumplen el requisito */
function filtrarRutasPorDistancia(listaRutas, distancia) {
    var rutas = [];
    for (var i = 0; i < listaRutas.length; i++) {
        var kilometros = parseFloat(listaRutas[i].kilometros);
        if (distancia == 1 && kilometros < 3) {
            rutas.push(listaRutas[i]);
        } else if (distancia == 2
            && (kilometros >= 3 && kilometros < 6)) {
            rutas.push(listaRutas[i]);
        } else if (distancia == 3
            && (kilometros >= 6 && kilometros <= 10)) {
            rutas.push(listaRutas[i]);
        } else if (distancia == 4 && (kilometros > 10)) {
            rutas.push(listaRutas[i]);
        }
    }
    return rutas;
}

/*Dada una ubicación devuelve las rutas asociadas a esa ubicación*/
function filtrarRutasPorUbicacion(listaRutas, ubicacion) {
    var rutas = [];
    for (var i = 0; i < listaRutas.length; i++) {
        if (listaRutas[i].comunidad == ubicacion) {
            rutas.push(listaRutas[i]);
        }
    }
    return rutas;
}

/* Esta función aplicara tantos filtros como sean necesarios. */
function procesarFiltrosPintarFiltrado(nombre, dificultad, tipo, distancia, ubicacion) {
    var tituloResultados = "Mostrando resultados filtrados por: ";
    var listaFiltrada = listaRutas;
    if (dificultad != "undefined") {
        listaFiltrada = filtrarRutasPorDificultad(listaFiltrada, dificultad);
        tituloResultados += "dificultad, ";
    }
    if (tipo != "undefined") {
        listaFiltrada = filtrarRutasPorTipo(listaFiltrada, tipo);
        tituloResultados += "tipo, ";
    }
    if (distancia != "undefined") {
        listaFiltrada = filtrarRutasPorDistancia(listaFiltrada, distancia);
        tituloResultados += "distancia, ";
    }
    if (ubicacion != "undefined") {
        listaFiltrada = filtrarRutasPorUbicacion(listaFiltrada, ubicacion);
        tituloResultados += "ubicación, ";
    }
    if (nombre != "") {
        listaFiltrada = buscarRutaPorNombre(listaFiltrada, nombre);
        tituloResultados += "nombre, ";
    }

    //Si no se aplica ningún filtro se mostrarán las rutas más populares.
    if (tituloResultados == "Mostrando resultados filtrados por: ") {
        tituloResultados = "Estas son las rutas más populares...";
        listaFiltrada = obtenerRutasPopulares();
    }

    if (listaFiltrada.length == 0) {
        tituloResultados = "No hay ninguna ruta que cumpla los criterios establecidos, mostrando las rutas más populares";
        listaFiltrada = obtenerRutasPopulares();
    }
    else
        tituloResultados = tituloResultados.substring(0, tituloResultados.length - 2)

    document.getElementById("tit-rutas-buscadas").innerHTML = tituloResultados;

    return listaFiltrada;

}

/* Función que mostrará los resultados filtrados :·) !important */
function mostrarResultadosFiltrados() {
    //Obtengo los valores del formulario de filtrado.
    var nombre = document.getElementById("buscador").value;
    var distancia = document.getElementById("distancia").value;
    var dificultad = document.getElementById("dificultad").value;
    var ubicacion = document.getElementById("ubicacion").value;
    var tipo = document.getElementById("tipo").value;
    listaFiltered = procesarFiltrosPintarFiltrado(nombre, dificultad, tipo, distancia, ubicacion);

    pintarRutas(listaFiltered);
    if (listaFiltered.length / 6 > 1) {
        indicePosMostrar = 6;
        divPaginacion = document.getElementById("paginacion");
        divPaginacion.innerHTML = "<span onclick='mostrarRutasSiguientes()' style='float:right'>Siguiente</span>";
    }
}

/**
 * Esta función recibe una listas de rutas y la pinta en pantalla, antes de esto limpia los resultados anteriores.
 * Si la lista que obtiene esta vacía (En el caso de con los criterios establecidos no se encuentre ninguna ruta, no se limpiarán los resultados
 *
 * @param listaRutas
 */
function pintarRutas(listaRutas) {
    //Limpio los resultados par mostrar los nuevos resultados filtrados.
    for (var i = 0; i < divsDeRutas.length && listaRutas.length > 0; i++) {
        if (divsDeRutas[i].innerHTML == "") break;
        divsDeRutas[i].innerHTML = "";
    }
    //Este loop va pintando cada ruta en pantalla siempre y de que el índice de la ruta no sea undefined, esto hay que hacerlo porque en algunos casos
    //El indice va a ser sobrepasado por las funciones de paginación que muestran de 6 en 6.
    for (var i = 0; i < 6; i++) {
        if (listaRutas[i] != undefined) {
            divsDeRutas[i].innerHTML = '<div class="row">' +
                '<h4 class="col-xs-12">' + listaRutas[i].nombre + '</h4>' +
                '<img class="img-responsive col-xs-8" src="' + listaRutas[i].images[0] + '">' +
                '<div class="informacion-rutas" class="col-xs-4">' +
                '<span>Distancia:</span> ' + '<span style="color:' + determinarColorLetra("distancia", listaRutas[i].kilometros) + '">' + listaRutas[i].kilometros + 'km</span><br>' +
                '<span>Dificultad:</span><span style="color:' + determinarColorLetra("dificultad", listaRutas[i].dificultad) + '"> ' + listaRutas[i].dificultad + '</span><br>' +
                '<span>Localización:</span> ' + listaRutas[i].comunidad + '<br>' +
                '<span>Terreno:</span><span style="color:' + determinarColorLetra("terreno", listaRutas[i].tipo) + '"> ' + listaRutas[i].tipo + '</span><br>' +
                '<div class="btn-rutas" class="col-xs-12">' +
                '<button type="button" class="btn btn-success">Más imágenes</button> ' +
                '<button type="button" class="btn btn-success">Contratar</button></div></div></div>';
        } else break;
    }
}

/*Este método es llamado cuando hay más de 6 reutas y por lo tanto los botones de siguiente y anterior tienen que apaecer*/
function mostrarRutasSiguientes() {
    indicePosMostrar += 6;
    //Si el indice que va a mostrar es mayor que la longitud total solo tiene que mostrar el botón de anterior, si no es así tiene que mostrar los dos.
    if (indicePosMostrar > listaFiltered.length) {
        divPaginacion.innerHTML = "<span onclick='mostrarRutasAnteriores()' style='float:left'>Anterior</span>";
    } else {
        divPaginacion.innerHTML = "<span onclick='mostrarRutasSiguientes()' style='float:right'>Siguiente</span>";
        divPaginacion.innerHTML += "<span onclick='mostrarRutasAnteriores()' style='float:left'>Anterior</span>";
    }
    //Le paso el array sin restando las 6 posiciones (que ya han sido mostradas)
    pintarRutas(listaFiltered.slice(indicePosMostrar - 6, listaFiltered.length));

}

//Si el indice esta en 6 (Es decir, ha mostrado 6 rutas o menos solo tiene que mostrar el botón de siguiente, si no tiene que mostrar los dos botones)
function mostrarRutasAnteriores() {
    indicePosMostrar -= 6;
    if (indicePosMostrar <= 6) {
        divPaginacion.innerHTML = "<span onclick='mostrarRutasSiguientes()' style='float:right'>Siguiente</span>";
    } else {
        divPaginacion.innerHTML = "<span onclick='mostrarRutasSiguientes()' style='float:right'>Siguiente</span>";
        divPaginacion.innerHTML += "<span onclick='mostrarRutasAnteriores()' style='float:left'>Anterior</span>";
    }
    pintarRutas(listaFiltered.slice(indicePosMostrar - 6, listaFiltered.length));
}

/*Esta función esllamada desde pintar rutas para determinar el color que debe llevar el parametro mostrado*/
function determinarColorLetra(tipoValor, valor) {
    var color;

    switch (tipoValor) {
        //En el caso de que el valor para mostrar sea dificultad
        case "dificultad":
            if (valor == "Fácil") color = "green"; //Si es fácil mostrara el color verde
            else if (valor == "Normal") color = "#C5C516"; // si es normal mostrará amarillo
            else  color = "red"; // Si es díficil mostrará rojo
            break;
        //En este caso es igual que el anterior a excepción que el color amarillo solo se muestra si la ruta esta entre 5 y 20 (km)
        case "distancia":
            if (valor < 5) color = "green";
            else if (valor >= 5 && valor <= 20)color = "#C5C516";
            else color = "red";
            break;
        case "terreno":
            if (valor == "Sendero") color = "green";
            else if (valor == "Montaña") color = "brown";
            break;
    }
    return color;
}
