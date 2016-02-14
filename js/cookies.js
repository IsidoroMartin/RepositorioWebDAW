/*
 * Autor= Juan José Ramírez Sánchez
 * Fecha= 07 de feb. de 2016
 * Licencia=gp130
 * Version=1.0
 * Descripcion = Obtención de datos y lógica de filtrado y paginción de la página web de rutas
 *

 Copyright (C) 2016 Juan José Ramírez Sánchez

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

function setCookieDays(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(name) {
    var cookie = getCookie(name);
    if (cookie != "") {
        return true;
    }
    return false;
}

/**
 * Muestra el mensaje de bienvenida si es necesario, (Dependiendo de si el mensaje ya ha salido y además
 * Si existe la cookie del nombre)
 */
function mensajeBienvenidaSiNecesario() {
    var nombreCookie = "nombre";
    if (checkCookie(nombreCookie) && !checkCookie("name-accepted")) {
        setCookie("name-accepted", "true");
        var nombre = capitalizeFirstLetter(decodeURIComponent(getCookie(nombreCookie)));
        swal({
            title: "<img id='img-bienvenida' src='./img/logo.png'><h3>Bienvenido de nuevo</h3>",
            text: "<strong id='nombre-cookie'>" + nombre + "</strong>",
            html: true
        });
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


