let divError = document.getElementById("error")
let citas = document.getElementById('citas')
let arraydatos = []
let modal = document.querySelector('.modal1');
let filtro = document.getElementById('lista_fil')
let modal2 = document.querySelector('.modal2')
let boton = document.getElementById('btfuncion')
let numeroid = 0;


//funcion para el boton de agregar
function agregar() {

    modal.style.display = "flex"
    document.getElementById('tituloh2').textContent = "Nueva cita"
    boton.textContent = 'GUARDAR'
    boton.onclick = () => guardar()

}

//funcion para los botenes de cerrar los modales
function cerrar() {
    modal.style.display = "none"
    modal2.style.display = "none"
}

//funcion para el boton de editar de tag
function editatag(id) {
    let posicion = arraydatos.findIndex(x => x.id == id)
    modal.style.display = "flex"
    document.getElementById('tituloh2').textContent = `Editar cita ${posicion +1}`;
    document.getElementById('propietario').value = `${arraydatos[posicion].propietario}`;
    document.getElementById('telefono').value = `${arraydatos[posicion].telefono}`;
    document.getElementById('nombre').value = `${arraydatos[posicion].nombre}`;
    document.getElementById('fecha').value = `${arraydatos[posicion].fecha}`;
    document.getElementById('hora').value = `${arraydatos[posicion].hora}`;
    document.getElementById('mascotas').value = `${arraydatos[posicion].mascotas}`;
    document.getElementById('sintomas').value = `${arraydatos[posicion].sintoma}`;
    boton.textContent = 'EDITAR';
    boton.onclick = () => guardar(id)

}

//funcion para crear y colocar los tag sumandose en los que ya existen
function createtag(item) {
    let imagen = ""
    if(item.mascotas == "perro"){
        imagen = "perro.gif"
    }else if(item.mascotas == "cabra"){
        imagen = "cabra.gif"
    }else if(item.mascotas == "pato"){
        imagen = "pato.gif"
    }else if(item.mascotas == "dinosaurio"){
        imagen = "dinosaurio.gif"
    }else if(item.mascotas == "elefante"){
        imagen = "elefante.gif"
    }else if(item.mascotas == "gato"){
        imagen = "gato.gif"
    }else if(item.mascotas == "pez"){
        imagen = "pez.gif"
    }else if(item.mascotas == "pollo"){
        imagen = "pollo.gif"
    }else if(item.mascotas == "vaca"){
        imagen = "vaca.gif"
    }
    citas.innerHTML += `
        <div class='tag'>
            <img src="${imagen}">
            <h4>cita numero ${item.id + 1}</h4>
            <h3>${item.nombre}</h3>
            <h5>${item.propietario}</h5>
            <h5>${item.telefono}</h5>
            <h5>${item.fecha}</h5>
            <h5>${item.sintoma}</h5>
            <h5>estado: ${item.estado}</h5>
            <div>
                <button onclick="editatag(${item.id})">editar</button>
                <button onclick="cerrartag(${item.id})">cerrar</button>
                <button onclick="anulartag(${item.id})">anular</button>
                <button onclick="eliminartag(${item.id})">eliminar</button>
            </div> 
        </div>`
}

function cerrartag(id){
    let posicion = arraydatos.findIndex(x => x.id == id)
    arraydatos[posicion].estado = 'cerrado'
    filtrado()
}

function anulartag(id){
    let posicion = arraydatos.findIndex(x => x.id == id)
    arraydatos[posicion].estado = 'anulado'
    filtrado()
}

function eliminartag(id){
    let posicion = arraydatos.findIndex(x => x.id == id)
    arraydatos.splice(posicion, 1);
    filtrado()
}
//funcion para dibujar el filtrado
function filtrado() {
    let valor = filtro.value;
    citas.innerHTML = ''
    if (valor == 'todos') {
        arraydatos.forEach((item) => {
            createtag(item)
        })
    } else if (valor == 'activas') {
        arraydatos.forEach((item) => {
            if (item.estado == 'abierta') {
                createtag(item)
            }

        })
    } else if (valor == 'cerradas') {
        arraydatos.forEach((item) => {
            if (item.estado == 'cerrado') {
                createtag(item)
            }

        })
    } else if (valor == 'anuladas') {
        arraydatos.forEach((item) => {
            if (item.estado == 'anulado') {
                createtag(item)
            }

        })
    }
}

//funcion de guardar y editar los tag
function guardar(id = 'no') {

    let nombre = document.getElementById('nombre').value;
    let propietario = document.getElementById('propietario').value;
    let telefono = document.getElementById('telefono').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let mascotas = document.getElementById('mascotas').value;
    let sintoma = document.getElementById('sintomas').value;
    let dateactual = new Date()

    //validaciones
    if (!nombre) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "Por favor digite el nombre"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (!propietario) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "Por favor digite el propietario"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (!telefono) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "Por favor digite el telefono"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (!fecha) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "Por favor digite la fecha"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (!hora) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "Por favor digite la hora"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (!sintoma) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "Por favor escriba el sintoma"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (new Date(`${fecha}T${hora}`) < dateactual) {
        divError.style.display = "block"
        document.getElementById("msj").textContent = "No se pueden colocar fechas y otras pasadas a la actual"
        setTimeout(() => {
            divError.style.display = "none"
        }, 4000);
    } else if (id == 'no') {
        //logica para agregar el tag nuevo
        arraydatos.push({
            id: numeroid,
            nombre: nombre,
            propietario: propietario,
            telefono: telefono,
            fecha: fecha,
            hora: hora,
            mascotas: mascotas,
            sintoma: sintoma,
            estado: "abierta"
        })
        numeroid += 1

        createtag(arraydatos[arraydatos.length - 1])

        modal.style.display = "none"
    } else {
        //logica para editar el tag escojido 
        let posicion = arraydatos.findIndex(item => item.id == id)
        arraydatos[posicion] = {
            id: id,
            nombre: nombre,
            propietario: propietario,
            telefono: telefono,
            fecha: fecha,
            hora: hora,
            mascotas: mascotas,
            sintoma: sintoma,
            estado: arraydatos[posicion].estado
        }
        //aca reescribimos citas con los valores actualizados
        filtrado()

        modal.style.display = 'none'

    }

}

//este es el lugar don de se ubicara el filtro de las tag
filtro.addEventListener('change', () => {
    filtrado()
})

