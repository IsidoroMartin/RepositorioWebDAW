/*
 * Autor= YesicaRojas
 * Fecha= 10 de dic. de 2015
 * Licencia=gp130
 * Version=1.0
 * Descripcion= validacion de los campos del formulario de la pagina CONCTACTO de la web NaturePath.
 */

/*
 Copyright (C) 2015 yesica alexandra rojas

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

//listas
//funcion que rellena la lista asunto uando seleccionas una opcion del tipo de cosulta
function rellenarLista(frm) {

    var consulta = document.getElementById("tipoConsulta").selectedIndex
    if (consulta > 0) {
        frm.asunto.disabled = false

    } else {
        frm.asunto.disabled = true
    }

    var arraytextos = new Array(4)
    arraytextos["consulta"] = ["", "", "", "", ""]
    arraytextos["sugerencia"] = ["Sobre la web", "Sobre guias", "Sobre Rutas", "Otros..."]
    arraytextos["queja"] = ["Sobre la web", "Sobre organización", "Otros..."]
    arraytextos["informacion"] = ["Sobre rutas", "Sobre guias", "Fotos", "Otros..."]

    var tipoConsulta = document.getElementById("tipoConsulta")
    var asunto = document.getElementById("asunto")
    var indiceSeleccionado = tipoConsulta.options[tipoConsulta.selectedIndex].value

    while (asunto.options.length) {
        asunto.remove(0)
    }
    var consulta = arraytextos[indiceSeleccionado]
    if (consulta) {
        for (var i = 0; i < consulta.length; i++) {
            var asuntoi = new Option(consulta[i], i)
            asunto.options.add(asuntoi)
        }
    }
    activarBoton(frm)
}

// funcion que habilita la casilla terminos (checkbox) si estan todos los campos
// rellenos
function habilitarTerminosYCondiciones(frm) {

    var nombre = document.getElementById("nombre").value
    var apellido1 = document.getElementById("primerApellido").value
    var apellido2 = document.getElementById("segundoApellido").value
    var email = document.getElementById("email").value
    var telefonoMovil = document.getElementById("telefonoMovil").value
    var descripcion = document.getElementById("descripcion").value
    var consulta = document.getElementById("tipoConsulta").selectedIndex
    var asunto = document.getElementById("asunto").selectedIndex

    if (nombre != "" && apellido1 != "" && apellido2 != "" && email != ""
        && telefonoMovil != "" && descripcion != "" && consulta != 0
        && asunto != 0) {
        //alert("habilitado")
        frm.terminos.disabled = false
        return true
    }
    frm.terminos.disabled = true
    return false
}

// funcion que habilita el boton si estan todos los campos rellenos y la
// casillla de verificacion esta chekeada
function activarBoton(frm) {
    var terminos = document.getElementById("terminos")
    if (habilitarTerminosYCondiciones(frm) && terminos.checked) {
        frm.envio.disabled = false
    } else {
        frm.envio.disabled = true
    }

}
