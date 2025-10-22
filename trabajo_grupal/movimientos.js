movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    //Se barre el arreglo de movimientos
    for(let i=0;i<movimientos.length;i++){
        if(movimientos[i].numeroCuenta==numeroCuenta){
            movimientosCuenta.push(movimientos[i]);
        }
    }
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    for(let i=0;i<movimientosCuenta.length;i++){
        if(movimientosCuenta[i].tipo=="D"){
            movimientosCuenta[i].monto *= -1;
        }
    }

    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    mostrarMovimientos(movimientosCuenta);
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    let cmpTabla= document.getElementById("tablaMovimientos");

    //Columnas: NUMERO CUENTA, MONTO, TIPO
    let contenidoTabla = "<table><tr>" + "<th> CUENTA </th>" + "<th> MONTO </th>" + "<th> OPERACION </th>" + "</tr>";
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
}




