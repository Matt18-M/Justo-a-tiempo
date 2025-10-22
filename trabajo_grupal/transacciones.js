// transacciones.js
cuentas = [
    {numeroCuenta:"02234567", cedula:"1714616123", nombre:"Juan", apellido:"Perez", saldo:0.0},
    {numeroCuenta:"02345211", cedula:"1281238233", nombre:"Felipe", apellido:"Caicedo", saldo:0.0}
]

cargar = function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
}

mostrarCuentas = function() {
    mostrarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
}

mostrarTransacciones = function() {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
}

mostrarMovimientos = function() {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function(numeroCuenta){
    for(let i = 0; i < cuentas.length; i++) {
        if(cuentas[i].numeroCuenta === numeroCuenta) {
            return cuentas[i];
        }
    }
    return null;
}

ejecutarBusqueda = function(){
    // toma el numero de cuenta de la caja de texto
    let numeroCuenta = recuperarTexto("txtBuscarCuenta");
    
    // invoca a buscarCuenta y guarda el resultado en una variable
    let cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    // Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    if(cuentaEncontrada !== null) {
        mostrarTextoEnCaja("txtNombreCuenta", cuentaEncontrada.nombre + " " + cuentaEncontrada.apellido);
        mostrarTextoEnCaja("txtSaldoActual", cuentaEncontrada.saldo.toFixed(2));
        
        // Habilitar botones y campo de monto
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

depositar = function(numeroCuenta, monto){
    let cuentaAfectada;
    // invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if(cuentaAfectada !== null) {
        // Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
        cuentaAfectada.saldo += monto;
        return true;
    }
    return false;
}

ejecutarDeposito = function(){
    // Toma el numero de cuenta ingresado en la caja de texto
    let numeroCuenta = recuperarTexto("txtBuscarCuenta");
    
    // Toma el monto ingresado en la caja de texto
    let monto = recuperarFloat("txtMonto");
    
    if(monto <= 0) {
        alert("El monto debe ser mayor a cero");
        return;
    }
    
    // invoca a depositar
    let resultado = depositar(numeroCuenta, monto);
    
    if(resultado) {
        // Muestra un mensaje TRANSACCION EXITOSA
        alert("TRANSACCION EXITOSA");
        
        // Actualiza el saldo mostrado
        let cuentaActualizada = buscarCuenta(numeroCuenta);
        mostrarTextoEnCaja("txtSaldoActual", cuentaActualizada.saldo.toFixed(2));
        
        // Limpia el campo de monto
        mostrarTextoEnCaja("txtMonto", "");
    } else {
        alert("Error al realizar el depósito");
    }
}

retirar = function(numeroCuenta, monto){
    let cuentaAfectada;
    // invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if(cuentaAfectada !== null) {
        // Valida si la cuenta tiene el saldo suficiente para retirar el monto
        if(cuentaAfectada.saldo >= monto) {
            // Si el saldo es suficiente, al saldo actual de la cuenta afectada, le resta el monto
            cuentaAfectada.saldo -= monto;
            return true;
        } else {
            // Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
            alert("SALDO INSUFICIENTE");
            return false;
        }
    }
    return false;
}

ejecutarRetiro = function(){
    // Toma el numero de cuenta ingresado en la caja de texto
    let numeroCuenta = recuperarTexto("txtBuscarCuenta");
    
    // Toma el monto ingresado en la caja de texto
    let monto = recuperarFloat("txtMonto");
    
    if(monto <= 0) {
        alert("El monto debe ser mayor a cero");
        return;
    }
    
    // invoca a retirar
    let resultado = retirar(numeroCuenta, monto);
    
    if(resultado) {
        // Si logra retirar muestra un mensaje TRANSACCION EXITOSA
        alert("TRANSACCION EXITOSA");
        
        // Actualiza el saldo mostrado
        let cuentaActualizada = buscarCuenta(numeroCuenta);
        mostrarTextoEnCaja("txtSaldoActual", cuentaActualizada.saldo.toFixed(2));
        
        // Limpia el campo de monto
        mostrarTextoEnCaja("txtMonto", "");
    }
}