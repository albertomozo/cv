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

function obtenerEpigrafe(ruta) {
  // Define los epígrafes principales según la estructura de tu JSON
  if (ruta.includes('experience')) return 'Experiencia';
  if (ruta.includes('knowledge') && ruta.includes('studies')) return 'Formación';
  if (ruta.includes('knowledge') && ruta.includes('hardSkills')) return 'Habilidades';
  if (ruta.includes('aboutMe')) return 'Sobre mí';
  if (ruta.includes('manfredSpecificData')) return 'Trabajo deseado';
  return 'Otro';
}

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
        //realizarBusqueda(inputId);
        // Ejemplo de uso:
        const resultados = buscarEnCV(cv, miInput.value);
        console.log('Coincidencias encontradas en:', resultados);  
         const epigrafes = [...new Set(resultados.map(obtenerEpigrafe))];

         const div = document.getElementById('preguntarChat');
        if (epigrafes.length === 0) {
            div.innerHTML = '<div class="mensaje">No se encontraron coincidencias.</div>';
        } else {
            div.innerHTML = '<div class="mensaje">Encontrado el termino ' + miInput.value+' en: <ul>' +
            epigrafes.map(e => `<li>${e}</li>`).join('') +
            '</ul></div>';
        }
        div.style.display = 'block';

    });

    // Añadir el input y el botón al contenedor
    const preguntarChat = document.getElementById('preguntarChat');
    preguntarChat.innerHTML = ''; // Limpiar contenido previo si es necesario
    preguntarChat.appendChild(miInput);
    preguntarChat.appendChild(searchButton);
}

// Función de búsqueda separada
/* function realizarBusqueda(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        const raw = JSON.stringify({
            "pregunta": inputElement.value
        });

        const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
             },
            body: raw,
            redirect: "follow"
        };

        fetch("https://albertomozo-cv-buscador.vercel.app/api/preguntar", requestOptions)
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
 */

  /**
 * Busca un término en cualquier valor del objeto cv.
 * @param {Object} obj - Objeto donde buscar.
 * @param {string} term - Término a buscar (no sensible a mayúsculas).
 * @returns {Array} - Lista de rutas donde se encontró el término.
 */
function buscarEnCV(obj, term, ruta = '') {
  let resultados = [];
  const lowerTerm = term.toLowerCase();

  if (typeof obj === 'string') {
    if (obj.toLowerCase().includes(lowerTerm)) {
      resultados.push(ruta);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      resultados = resultados.concat(buscarEnCV(item, term, `${ruta}[${i}]`));
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      resultados = resultados.concat(
        buscarEnCV(obj[key], term, ruta ? `${ruta}.${key}` : key)
      );
    });
  }
  return resultados;
}

