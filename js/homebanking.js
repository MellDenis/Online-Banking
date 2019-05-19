//Declaración de variables
var nombreUsuario = "Luis";
var saldoCuenta = 2000;
var limiteExtraccion = 4000;

//Variables de pago de servicios
const agua = 350;
const tel = 425;
const luz = 210;
const internet = 570;

//Variables de transferencia
const cuentaAmiga1 = 1234567;
const cuentaAmiga2 = 7654321; 

//Variable inicio de sesion
const claveOk = 1234;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones a realizar
function sumarDinero(dinero){
    saldoCuenta += dinero;   
}

function restarDinero(dinero){
    saldoCuenta -= dinero;
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var limiteNuevo = parseInt(prompt("Ingrese nuevo limite de extracción:"));
    if (isNaN(limiteNuevo) == false && limiteNuevo != null) {
        if(limiteNuevo > 0) {
            limiteExtraccion = limiteNuevo;
            actualizarLimiteEnPantalla();
            alert("Nuevo límite de extracción: $" + limiteExtraccion);
        }
        else {
            alert("Debe ingresar un valor superior a cero.");
        }
    }
    else {
        alert("Debe ingresar un valor numérico ");
   }  
}

//Funcion de verificar los 3 items pedidos
function verificarExtraccion(valor) {  
    if(isNaN(valor) == false ){
        if (valor <= saldoCuenta) {
            if (valor <= limiteExtraccion) {
                if (valor % 100 == 0) {
                    var saldoAnterior = saldoCuenta;
                    restarDinero(valor);
                    alert("Saldo anterior: $" +saldoAnterior+ '\n' + "Extracción: $" +valor+ '\n' + "Saldo actual: $"+saldoCuenta);
                    actualizarSaldoEnPantalla();
                } else {
                    alert("Debe ingresar un monto equivalente a 100.");
                }
            } else {
                alert("El monto ingresado supera el límite de extracción.");
            }
        } else { 
            alert("No dispone de saldo en su cuenta.");
        }
    } else {
        alert("Ingrese un valor numérico.");
    }   
}

function extraerDinero() {
   var monto = parseInt(prompt("Monto a retirar:"));  
   verificarExtraccion(monto); 
}

function depositarDinero() {
   var ingreso = parseInt(prompt("Monto a depositar:"));
   if(isNaN(ingreso) == false){
        if (ingreso > 0) {
            var saldoAnterior = saldoCuenta;
            sumarDinero(ingreso);
            alert("Saldo anterior: $" +saldoAnterior+ '\n' + "Saldo depositado: $" +ingreso+ '\n' + "Saldo actual: $"+saldoCuenta);
            actualizarSaldoEnPantalla();
        }
        else {
            alert("Ingresar un valor mayor a cero.");
        }
   }
   else{
        alert("Debe ingresar un valor numérico.");
   }
}

//Verifica si hay saldo en la cuenta para abonar un servicio.
function verificarSaldo(servicio,nombreServicio){
    if(saldoCuenta >= servicio){
        var saldoAnterior = saldoCuenta;
        restarDinero(servicio);
        alert("Abono el servicio de " +nombreServicio+ ": $" +servicio+ '\n' + "Saldo anterior: $" +saldoAnterior+ '\n' + "Saldo actual: $"+saldoCuenta);
        actualizarSaldoEnPantalla();
    }
    else{
        alert("No posee saldo suficiente para efectuar el pago.");
    } 
}

function pagarServicio() { 
    var servicio = parseInt(prompt("Ingrese el número que corresponde con el servicio abonar: \n 1- Agua \n 2- Teléfono \n 3- Luz \n 4- Internet "));
    if (isNaN(servicio) == false) {
        switch (servicio) {
            case 1:
                verificarSaldo(agua,"agua");
                break;
            case 2:    
                verificarSaldo(tel,"teléfono");
                break;
            case 3: 
                verificarSaldo(luz,"luz");   
                break; 
            case 4:    
                verificarSaldo(internet,"internet");
                break;    
            default:
                alert("No se registra ningún servicio con la opción indicada, por favor intente nuevamente.");
                break;
        }
    }
    else {
        alert("Debe ingresar un valor numérico.");
    }     
}

//Verifica si el numero de cuenta ingresado es algunos de los agendados.
function verificarCuenta(nroCuenta,monto){
    if(nroCuenta == cuentaAmiga1 || nroCuenta == cuentaAmiga2){
        restarDinero(monto);
        alert("Se ha transferido: $" + monto+ "\n" + "Cuenta destino: " + nroCuenta);
        actualizarSaldoEnPantalla();
    }
    else{
        alert("Solo puede transferir dinero a cuentas que se encuentren agendadas.");
    }
}

function transferirDinero() {
    var importe = prompt("Ingrese el importe a transferir:"); 
    if (isNaN(importe) == false) {
        if (importe > 0) {
            if(importe <= saldoCuenta){
                var cuenta = parseInt(prompt("Ingrese el número de cuenta a transferir:"));
                verificarCuenta(cuenta,importe);
            }
            else{
                alert("No tiene saldo suficiente para realizar la transferencia.");
            }  
        }
        else{
            alert("Debe ingresar un valor superior a cero.");
        }     
    }
    else{
        alert("Debe ingresar un valor numérico.");
    }
}

function iniciarSesion() {
    var clave = parseInt(prompt("Ingrese su clave:"));
    if(clave === claveOk){
        alert("Bienvenido " +nombreUsuario+ " ya puedes comenzar a realizar operaciones.");
    }
    else{
        saldoCuenta = 0;
        alert("Clave incorrecta. Su dinero ha sido retenido por cuestiones de seguridad.");
        function demoVisibility() {
            document.getElementById("myP2").style.visibility = "hidden";
        }
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}