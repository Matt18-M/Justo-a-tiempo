// Datos compartidos
let cuentas = [
    {numeroCuenta:"02234567", cedula:"1714616123", nombre:"Juan", apellido:"Perez", saldo:0.0},
    {numeroCuenta:"02345211", cedula:"1281238233", nombre:"Felipe", apellido:"Caicedo", saldo:0.0}
];

let movimientos = [
    {numeroCuenta:"02234567", monto:10.24, tipo:"D"},
    {numeroCuenta:"02345211", monto:45.90, tipo:"D"},
    {numeroCuenta:"02234567", monto:65.23, tipo:"C"},
    {numeroCuenta:"02345211", monto:65.23, tipo:"C"},
    {numeroCuenta:"02345211", monto:12.0, tipo:"D"},
];

// Funciones de navegación
function cargar() {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarTablaCuentas();
}

function mostrarCuentas() {
    mostrarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    mostrarTablaCuentas();
}

function mostrarTransacciones() {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    mostrarTextoEnCaja("txtNombreCuenta", "");
    mostrarTextoEnCaja("txtSaldoActual", "");
    mostrarTextoEnCaja("txtMonto", "");
    mostrarTextoEnCaja("txtBuscarCuenta", "");
}

function mostrarMovimientos() {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    mostrarTextoEnCaja("txtNumCuenta3", "");
    document.getElementById("tablaMovimientos").innerHTML = "";
}

// Funciones para el módulo de cuentas
function mostrarTablaCuentas() {
    let cmpTabla = document.getElementById("lblTabla");
    let tabla = "<table><tr>" +
        "<th>NUMERO CUENTA</th>" +
        "<th>NOMBRE</th>" +
        "<th>SALDO</th></tr>";

    for(let i = 0; i < cuentas.length; i++) {
        tabla += "<tr><td>" + cuentas[i].numeroCuenta + "</td>" +
            "<td>" + cuentas[i].nombre + " " + cuentas[i].apellido + "</td>" +
            "<td>$" + cuentas[i].saldo.toFixed(2) + "</td></tr>";
    }
    tabla += "</table>";
    cmpTabla.innerHTML = tabla;
}

function buscarCuenta(numeroCuenta) {
    for(let i = 0; i < cuentas.length; i++) {
        if(cuentas[i].numeroCuenta === numeroCuenta) {
            return cuentas[i];
        }
    }
    return null;
}

function agregarCuenta(cuenta) {
    if(buscarCuenta(cuenta.numeroCuenta) !== null) {
        alert("CUENTA EXISTENTE");
        return;
    }

    cuenta.saldo = 0.0;
    cuentas.push(cuenta);
    alert("CUENTA AGREGADA");
}

function agregar() {
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    let cedula = recuperarTexto("txtCedula");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    
    // Validaciones básicas
    if(!numeroCuenta || !cedula || !nombre || !apellido) {
        alert("Todos los campos son obligatorios");
        return;
    }
    
    let cuenta = {
        numeroCuenta: numeroCuenta,
        cedula: cedula,
        nombre: nombre,
        apellido: apellido
    };

    agregarCuenta(cuenta);
    mostrarTablaCuentas();
    
    // Limpiar campos después de agregar
    mostrarTextoEnCaja("txtNumeroCuenta", "");
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
}

// Funciones para el módulo de transacciones
function ejecutarBusqueda() {
    let numeroCuenta = recuperarTexto("txtBuscarCuenta");
    
    if(!numeroCuenta) {
        alert("Ingrese un número de cuenta");
        return;
    }
    
    let cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    if(cuentaEncontrada !== null) {
        mostrarTextoEnCaja("txtNombreCuenta", cuentaEncontrada.nombre + " " + cuentaEncontrada.apellido);
        mostrarTextoEnCaja("txtSaldoActual", "$" + cuentaEncontrada.saldo.toFixed(2));
        
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        habilitarComponente("txtMonto");
    } else {
        alert("CUENTA INEXISTENTE");
        mostrarTextoEnCaja("txtNombreCuenta", "");
        mostrarTextoEnCaja("txtSaldoActual", "");
        deshabilitarComponente("btnDepositar");
        deshabilitarComponente("btnRetirar");
        deshabilitarComponente("txtMonto");
    }
}

function depositar(numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if(cuentaAfectada !== null) {
        cuentaAfectada.saldo += monto;
        
        // Registrar movimiento
        movimientos.push({
            numeroCuenta: numeroCuenta,
            monto: monto,
            tipo: "C"
        });
        
        return true;
    }
    return false;
}

function ejecutarDeposito() {
    let numeroCuenta = recuperarTexto("txtBuscarCuenta");
    let monto = recuperarFloat("txtMonto");
    
    if(isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número mayor a cero");
        return;
    }
    
    let resultado = depositar(numeroCuenta, monto);
    
    if(resultado) {
        alert("TRANSACCION EXITOSA");
        
        let cuentaActualizada = buscarCuenta(numeroCuenta);
        mostrarTextoEnCaja("txtSaldoActual", "$" + cuentaActualizada.saldo.toFixed(2));
        mostrarTextoEnCaja("txtMonto", "");
    } else {
        alert("Error al realizar el depósito");
    }
}

function retirar(numeroCuenta, monto) {
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if(cuentaAfectada !== null) {
        if(cuentaAfectada.saldo >= monto) {
            cuentaAfectada.saldo -= monto;
            
            // Registrar movimiento
            movimientos.push({
                numeroCuenta: numeroCuenta,
                monto: monto,
                tipo: "D"
            });
            
            return true;
        } else {
            alert("SALDO INSUFICIENTE");
            return false;
        }
    }
    return false;
}

function ejecutarRetiro() {
    let numeroCuenta = recuperarTexto("txtBuscarCuenta");
    let monto = recuperarFloat("txtMonto");
    
    if(isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número mayor a cero");
        return;
    }
    
    let resultado = retirar(numeroCuenta, monto);
    
    if(resultado) {
        alert("TRANSACCION EXITOSA");
        
        let cuentaActualizada = buscarCuenta(numeroCuenta);
        mostrarTextoEnCaja("txtSaldoActual", "$" + cuentaActualizada.saldo.toFixed(2));
        mostrarTextoEnCaja("txtMonto", "");
    }
}

// Funciones para el módulo de movimientos
function mostrarMovimientos() {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    // Limpiar y resetear la sección de movimientos
    mostrarTextoEnCaja("txtNumCuenta3", "");
    document.getElementById("tablaMovimientos").innerHTML = "<p>Ingrese un número de cuenta y presione BUSCAR</p>";
}

function filtrarMovimientos(numeroCuenta) {
    let movimientosCuenta = [];
    
    // Primero verificar si la cuenta existe
    let cuentaExiste = buscarCuenta(numeroCuenta);
    if (!cuentaExiste) {
        document.getElementById("tablaMovimientos").innerHTML = "<p style='color: red;'>CUENTA NO ENCONTRADA</p>";
        return;
    }
    
    // Filtrar movimientos
    for(let i = 0; i < movimientos.length; i++) {
        if(movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    
    mostrarTablaMovimientos(movimientosCuenta);
}

function mostrarTablaMovimientos(misMovimientos) {
    let cmpTabla = document.getElementById("tablaMovimientos");
    
    if(misMovimientos.length === 0) {
        cmpTabla.innerHTML = "<p>No se encontraron movimientos para esta cuenta</p>";
        return;
    }
    
    let contenidoTabla = "<table><tr>" + 
        "<th>CUENTA</th>" + 
        "<th>MONTO</th>" + 
        "<th>TIPO</th>" + 
        "<th>DESCRIPCIÓN</th>" + 
        "</tr>";
    
    for(let i = 0; i < misMovimientos.length; i++) {
        let montoMostrar = misMovimientos[i].monto;
        let tipoOperacion = misMovimientos[i].tipo === "D" ? "DÉBITO" : "CRÉDITO";
        let signo = misMovimientos[i].tipo === "D" ? "-" : "+";
        let descripcion = misMovimientos[i].tipo === "D" ? "Retiro de fondos" : "Depósito de fondos";
        
        contenidoTabla += "<tr>" +
            "<td>" + misMovimientos[i].numeroCuenta + "</td>" +
            "<td style='color: " + (misMovimientos[i].tipo === "D" ? "red" : "green") + ";'>" + 
                signo + "$" + montoMostrar.toFixed(2) + "</td>" +
            "<td>" + tipoOperacion + "</td>" +
            "<td>" + descripcion + "</td>" +
            "</tr>";
    }
    
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}

function ejecutarMovimientos() {
    let numeroCuenta = recuperarTexto("txtNumCuenta3");
    
    if(!numeroCuenta) {
        alert("Ingrese un número de cuenta");
        return;
    }
    
    filtrarMovimientos(numeroCuenta);
}