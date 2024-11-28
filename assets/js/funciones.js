function toggleChat(chatId) {
    document.querySelector('.chat').style.display = 'none'; // cierro todos los .chat
    var chat = document.getElementById(chatId);
    if (chat.style.display === "none" || chat.style.display === "") {
        chat.style.display = "block";
    } else {
        chat.style.display = "none";
    }
}


function mensaje(tipo, imgsrc, nombre,descripcion,fechaInicial,fechaFin){



    var messageDiv = document.createElement("div");
    messageDiv.className = `message ${tipo}`    ;

    // Crear el logo de la empresa
    var logoDiv = document.createElement("div");
    logoDiv.className = "messageLogo";
    var img = document.createElement("img");
    if (imgsrc == undefined) {imgsrc = "assets/img/alberto.png";}
    img.src = imgsrc;
    logoDiv.appendChild(img);

    // Crear el cuerpo del mensaje
    var bodyDiv = document.createElement("div");
    bodyDiv.className = "messageBody";
    var empresaDiv = document.createElement("div");
    empresaDiv.className = nombre;
    var h3 = document.createElement("h3");
    h3.textContent =  nombre;
    empresaDiv.appendChild(h3);
    bodyDiv.appendChild(empresaDiv);
    bodyDiv.appendChild(document.createTextNode(descripcion));
    

    // Crear el contenedor de otros detalles
    var otrosDiv = document.createElement("div");
    otrosDiv.className = "messageOtros";
    var otrosSmall = document.createElement("small");
    otrosSmall.textContent = fechaInicial + ' - ' +  fechaFin  + '✔';
    otrosDiv.appendChild(otrosSmall);

    // Añadir todos los elementos al contenedor del mensaje
    messageDiv.appendChild(logoDiv);
    messageDiv.appendChild(bodyDiv);
    messageDiv.appendChild(otrosDiv);

    return messageDiv;


}



const obtenerIcon = async (nombre) => {
    const urlIcono = `https://cdn.simpleicons.org/${nombre}/000`; // color en hexadecimal
    const iconoPorDefecto = '<i class="fa-solid fa-question-circle"></i>'; // icono de fallback
    let icon = iconoPorDefecto;
    //const contenedorIcono = document.getElementById("icon-container");

    try {
        // Intentar cargar el icono
        const respuesta = await fetch(urlIcono);
        if (!respuesta.ok) {
            // Si la respuesta no es 200, usa el icono por defecto
            //contenedorIcono.innerHTML = iconoPorDefecto;
            icon = iconoPorDefecto;
        } else {
            // Si el icono existe, agrégalo al contenedor
            //contenedorIcono.innerHTML = `<img src="${urlIcono}" alt="${nombre} icon">`;
            icon = `<img src="${urlIcono}" alt="${nombre} icon">`;
        }
    } catch (error) {
        // En caso de cualquier error de red, muestra el icono por defecto
       // contenedorIcono.innerHTML = iconoPorDefecto;
       icon = iconoPorDefecto;
    }
    return icon;
};

function search() {
    toggleChat('preguntarChat'); // Asegúrate de que esta función haga visible el contenedor 'preguntarChat'
    
    // Generar un ID único basado en el timestamp
    const timestamp = Date.now();
    const inputId = `busquedaInput-${timestamp}`;
    
    // Crear el input y configurarlo
    const miInput = document.createElement('input');
    miInput.type = 'text';
    miInput.placeholder = '¿Qué quieres preguntar?';
    miInput.id = inputId;

    // Crear el botón de búsqueda
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar';

    // Añadir evento de búsqueda al botón
    searchButton.addEventListener('click', () => {
        realizarBusqueda(inputId);
    });

    // Añadir el input y el botón al contenedor
    const preguntarChat = document.getElementById('preguntarChat');
    preguntarChat.innerHTML = ''; // Limpiar contenido previo si es necesario
    preguntarChat.appendChild(miInput);
    preguntarChat.appendChild(searchButton);
}

// Función de búsqueda separada
function realizarBusqueda(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        const raw = JSON.stringify({
            pregunta: inputElement.value
        });

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: "follow"
        };

        fetch("https://albertomozo-cv-buscador.vercel.app/preguntar", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Asegúrate de que el servidor devuelve JSON
            })
            .then((result) => console.log(result))
            .catch((error) => console.error("Error en la solicitud:", error));
    } else {
        console.error("Input no encontrado:", inputId);
    }
}


    