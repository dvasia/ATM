var cuentas = [
    { nombre: "Mali", password: "123456", saldo: 200 },
    { nombre: "Gera", password: "123456", saldo: 290 },
    { nombre: "Maui", password: "123456", saldo: 67 }
];

function mostrarMensajeCuenta(mensaje) {
    var overlayDiv = document.getElementById("overlay");

    // Crear el contenedor del mensaje
    var mensajeContainer = document.createElement("div");
    mensajeContainer.id = "mensaje-cuenta";
    mensajeContainer.innerHTML = "<p>" + mensaje + "</p><button class='btn btn-primary' onclick='cerrarMensajeCuenta()'>Okay</button>";
    mensajeContainer.style.position = "fixed";
    mensajeContainer.style.top = "50%";
    mensajeContainer.style.left = "50%";
    mensajeContainer.style.transform = "translate(-50%, -50%)";
    mensajeContainer.style.backgroundColor = "#fff"; // Fondo gris como el resto de la página
    mensajeContainer.style.border = "1px solid #ccc";
    mensajeContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    mensajeContainer.style.zIndex = "1001"; // Asegurar que tenga una prioridad superior al menú
    mensajeContainer.style.padding = "20px"; // Padding añadido para dar aire alrededor

    // Agregar el contenedor del mensaje al cuerpo del documento
    document.body.appendChild(mensajeContainer);

    overlayDiv.style.display = "block";
}


function cerrarMensajeCuenta() {
    // Buscar el contenedor del mensaje por su ID
    var mensajeContainer = document.getElementById("mensaje-cuenta");

    // Verificar si el contenedor existe antes de intentar eliminarlo
    if (mensajeContainer) {
        // Eliminar el contenedor del mensaje al cerrar
        mensajeContainer.parentNode.removeChild(mensajeContainer);
    }

    // Ocultar el overlay
    var overlayDiv = document.getElementById("overlay");
    overlayDiv.style.display = "none";
}
  
  
  function volverAlMenu() {
    document.getElementById("opciones-cuenta").style.display = "block";
    document.getElementById("consulta-saldo").style.display = "none";
    document.getElementById("ingreso-monto").style.display = "none";
    document.getElementById("retiro-monto").style.display = "none";
  }

  function cancelar() {
    document.getElementById("opciones-cuenta").style.display = "block";
    document.getElementById("consulta-saldo").style.display = "none";
    document.getElementById("ingreso-monto").style.display = "none";
    document.getElementById("retiro-monto").style.display = "none";
    cerrarMensajeCuenta(); // Corregir el nombre de la función aquí
}

  
  function mostrarConsultaSaldo() {
    var cuentaSeleccionada = getCuentaSeleccionada();
    document.getElementById("consulta-saldo").style.display = "block";
    document.getElementById("saldo-info").innerText = "El saldo de la cuenta es: " + cuentaSeleccionada.saldo;
    document.getElementById("opciones-cuenta").style.display = "none";
  }
  
  function mostrarIngresoMonto() {
    document.getElementById("ingreso-monto").style.display = "block";
    document.getElementById("opciones-cuenta").style.display = "none";
  }
  
  function realizarIngreso() {
    var cuentaSeleccionada = getCuentaSeleccionada();
    var montoInput = document.getElementById("monto");
  
    if (validarMonto(montoInput.value)) {
        var montoEntero = parseInt(montoInput.value);
      
        // Validar que al realizar el ingreso, el saldo no supere $990
        if (cuentaSeleccionada.saldo + montoEntero > 990) {
            mostrarMensajeCuenta("El saldo total no puede superar $990");
            volverAlMenu();
            return;
        }
  
        cuentaSeleccionada.saldo += montoEntero;
        mostrarMensajeCuenta("Se ingresó exitosamente el monto de $" + montoEntero + ". <br> Nuevo saldo: $" + cuentaSeleccionada.saldo);
        volverAlMenu();
    }
}

  
  function mostrarRetiroMonto() {
    document.getElementById("retiro-monto").style.display = "block";
    document.getElementById("opciones-cuenta").style.display = "none";
  }
  
  function realizarRetiro() {
    var cuentaSeleccionada = getCuentaSeleccionada();
    var montoRetiroInput = document.getElementById("monto-retiro");
  
    if (validarMonto(montoRetiroInput.value) && validarSaldoSuficiente(cuentaSeleccionada, montoRetiroInput.value)) {
        var montoEntero = parseInt(montoRetiroInput.value);
  
        // Validar que al realizar el retiro, el saldo no sea menor a $10
        if (cuentaSeleccionada.saldo - montoEntero < 10) {
            mostrarMensajeCuenta("El saldo total no puede ser menor a $10");
            volverAlMenu();
            return;
        }
  
        cuentaSeleccionada.saldo -= montoEntero;
        mostrarMensajeCuenta("Se retiró exitosamente el monto de $" + montoEntero + ". <br> Nuevo saldo: $" + cuentaSeleccionada.saldo);
        volverAlMenu();
    }
}

  
  function cerrarSesion() {
    location.reload();
  }
  
  function getCuentaSeleccionada() {
    return cuentas.find(function (cuenta) {
      return cuenta.nombre === document.getElementById("cuenta").value;
    });
  }
  
  function validarMonto(monto) {
    if (monto === "" || isNaN(monto) || monto <= 0) {
        mostrarMensajeCuenta("El monto debe ser un número positivo");
        return false;
    }
    return true;
}

  
  function validarSaldoSuficiente(cuenta, monto) {
    if (monto > cuenta.saldo) {
      mostrarMensajeCuenta("Saldo insuficiente");
      volverAlMenu();
      return false;
    }
    return true;
  }
  
  function seleccionarCuenta(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    var cuenta = document.getElementById("cuenta").value;
    var password = document.getElementById("password").value;

    if (cuenta === "" || password === "") {
        return;
    }

    var cuentaSeleccionada = cuentas.find(function (cuentaObj) {
        return cuentaObj.nombre === cuenta && cuentaObj.password === password;
    });

    if (!cuentaSeleccionada) {
        mostrarMensajeCuenta("La cuenta no existe o la contraseña es incorrecta");
        return;
    }

    document.getElementById("nombre-cuenta").innerText = cuentaSeleccionada.nombre;
    document.getElementById("opciones-cuenta").style.display = "block";
    document.getElementById("seleccionar-cuenta").style.display = "none";
}


  
  document.getElementById("botonIngresar").addEventListener("click", seleccionarCuenta);
  document.getElementById("seleccionar-cuenta").addEventListener("submit", seleccionarCuenta);
  document.getElementById("consultar-saldo").addEventListener("click", mostrarConsultaSaldo);
  document.getElementById("ingresar-monto").addEventListener("click", mostrarIngresoMonto);
  document.getElementById("retirar-monto").addEventListener("click", mostrarRetiroMonto);
  document.getElementById("volver-menu").addEventListener("click", volverAlMenu);
  document.getElementById("realizar-ingreso").addEventListener("click", realizarIngreso);
  document.getElementById("realizar-retiro").addEventListener("click", realizarRetiro);
  document.getElementById("cerrar-sesion").addEventListener("click", cerrarSesion);
  