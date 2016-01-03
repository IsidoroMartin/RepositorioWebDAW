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

//funcion que devuelve true si todas las validaciones del formulario son correctas 
/*function validar() {
	if (ValidaCampo("nombre") && ValidaCampo("primerApellido") && ValidaCampo("segundoApellido")  && validaTelefonoFijo() && validaTelefonoMovil() &&  validaAsunto()) {
		return true
	}
	return false
}

/*
//funcion que valida si el campo  esta vacio
function ValidaCampo(id) {
	var apellido=document.getElementById(id).value
	if (apellido.length==0 || apellido=="") {
		alert(" el campo esta vacio")	
		return false
	}
	return true
}

//funcion que valida si el campo telefonoFijo tiene el formato correcto (el numero tiene que empezar por 9 y 8 digitos mas)
function validaTelefonoFijo() {
	var telefono=document.getElementById("telefonoFijo").value
	if (/^[9]\d{8}$/.test(telefono)) {
		return true
	}
	document.getElementById("telefonoFijo").value=""
	alert("telefono No valido debe empezar por 9")
return false
}

//funcion que valida si el campo telefonoMovil tiene el formato correcto (el numero tiene que empezar por 6  y 8 digitos mas)
function validaTelefonoMovil() {
	var telefono=document.getElementById("telefonoMovil").value
	if (/^[6]\d{8}$/.test(telefono)) {
		return true
	}
	document.getElementById("telefonoMovil").value=""
	alert("telefono No valido debe empezar por 6 ")
return false
}

//funcion que valiada si se ha escogido alguna opcion que no sea la 0 
function validaAsunto() {
	var asunto=document.getElementById("asunto").selectedIndex
	if (asunto==0) {
		alert("Asunto no puede quedar vacio porfavor seleccione un asunto")
		return false
	}
	return true
}
*/

//funcion que habilita la casilla terminos (checkbox) si estan todos los campos rellenos
function habilitarTerminosYCondiciones(frm) {
	var nombre=document.getElementById("nombre").value
	var apellido1=document.getElementById("primerApellido").value
	var apellido2=document.getElementById("segundoApellido").value
	var email=document.getElementById("email").value
	var telefonoMovil=document.getElementById("telefonoMovil").value
	var descripcion=document.getElementById("descripcion").value
	var asunto=document.getElementById("asunto").selectedIndex
	
	
	if (nombre!="" && apellido1!="" && apellido2!="" && email!="" && telefonoMovil!=""  && descripcion!=""  && asunto>0) {
		//alert("habilitado")
		frm.terminos.disabled=false
		return true
	}
	frm.terminos.disabled=true
	return false
}

//funcion que habilita el boton si estan todos los campos rellenos y la casillla de verificacion esta chekeada
function activarBoton(frm) {
	
	var terminos=document.getElementById("terminos")
	if (habilitarTerminosYCondiciones(frm) && terminos.checked) {
		frm.envio.disabled=false
	}else{
		frm.envio.disabled=true
	}
		
}