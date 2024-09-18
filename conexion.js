class Prestamo {
    constructor(nombre, monto, cuota) {
        this.nombre = nombre;
        this.monto = monto;
        this.cuota = cuota;
        this.montoFinal = this.calcularMontoFinal();
    }

    calcularMontoFinal() {
        let interes = 0;
        switch (this.cuota) {
            case "1":
                interes = 0;
                break;
            case "3":
                interes = 0.25;
                break;
            case "6":
                interes = 0.50;
                break;
            case "12":
                interes = 0.90;
                break;
            default:
                console.log("Cuota no válida. Se aplicará un interés del 100%.");
                interes = 1.00;
        }
        return this.monto + (this.monto * interes);
    }

    getDatosPrestamo() {
        return `
            <p>Prestamo</p>
            <p>Nombre: ${this.nombre}</p>
            <p>Monto: ${this.monto}</p>
            <p>Cuotas: ${this.cuota}</p>
            <p>Monto final a pagar: ${this.montoFinal}</p>
        `;
    }
}

let usuarios = [];

document.getElementById('usuarioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let nuevoNombre = document.getElementById('nuevoNombre').value;
    
    if (!usuarios.includes(nuevoNombre)) {
        usuarios.push(nuevoNombre);
        actualizarListaUsuarios();
        document.getElementById('prestamoSection').style.display = 'block';
        document.getElementById('resultado').innerHTML = `<p>Usuario ${nuevoNombre} creado correctamente.</p>`;
    } else {
        document.getElementById('resultado').innerHTML = `<p>El usuario ${nuevoNombre} ya existe.</p>`;
    }
    
    document.getElementById('usuarioForm').reset();
});

function actualizarListaUsuarios() {
    let select = document.getElementById('nombre');
    select.innerHTML = '';
    usuarios.forEach(usuario => {
        let option = document.createElement('option');
        option.value = usuario;
        option.textContent = usuario;
        select.appendChild(option);
    });
}

document.getElementById('prestamoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let monto = parseInt(document.getElementById('monto').value);
    let cuota = document.getElementById('cuota').value;

    let prestamo = new Prestamo(nombre, monto, cuota);
    document.getElementById('resultado').innerHTML = prestamo.getDatosPrestamo();
});

document.getElementById('simularPrestamoBtn').addEventListener('click', function() {
    Swal.fire("MUCHAS GRACIAS POR SU COMPRA");
});

let APIKEY = "b35f3bee30601ad44d0a20eec9229212";
function mostrarPosicion(posicion) {
    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => console.log(data));
}

navigator.geolocation.getCurrentPosition(mostrarPosicion);
