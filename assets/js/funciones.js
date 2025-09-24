function toggleChat(chatId) {
    // Oculta todos los .chat
    document.querySelectorAll('.chat').forEach(c => c.style.display = 'none');
    var chat = document.getElementById(chatId);
    if (chat.style.display === "none" || chat.style.display === "") {
        chat.style.display = "block";
    } else {
        chat.style.display = "none";
    }
}

function mensaje(tipo, imgsrc, nombre, descripcion, fechaInicial, fechaFin) {
    var messageDiv = document.createElement("div");
    messageDiv.className = `message ${tipo}`;

    // Logo
    var logoDiv = document.createElement("div");
    logoDiv.className = "messageLogo";
    var img = document.createElement("img");
    if (imgsrc == undefined) { imgsrc = "assets/img/alberto.png"; }
    img.src = imgsrc;
    logoDiv.appendChild(img);

    // Cuerpo
    var bodyDiv = document.createElement("div");
    bodyDiv.className = "messageBody";
    var empresaDiv = document.createElement("div");
    empresaDiv.className = nombre;
    var h3 = document.createElement("h3");
    h3.textContent = nombre;
    empresaDiv.appendChild(h3);
    bodyDiv.appendChild(empresaDiv);
    bodyDiv.appendChild(document.createTextNode(descripcion));

    // Otros detalles
    var otrosDiv = document.createElement("div");
    otrosDiv.className = "messageOtros";
    var otrosSmall = document.createElement("small");
    otrosSmall.textContent = fechaInicial + ' - ' + fechaFin + '✔';
    otrosDiv.appendChild(otrosSmall);

    // Ensamblar
    messageDiv.appendChild(logoDiv);
    messageDiv.appendChild(bodyDiv);
    messageDiv.appendChild(otrosDiv);

    return messageDiv;
}

const obtenerIcon = async (nombre) => {
    const urlIcono = `https://cdn.simpleicons.org/${nombre}/000`;
    const iconoPorDefecto = '<i class="fa-solid fa-question-circle"></i>';
    let icon = iconoPorDefecto;
    try {
        const respuesta = await fetch(urlIcono);
        if (!respuesta.ok) {
            icon = iconoPorDefecto;
        } else {
            icon = `<img src="${urlIcono}" alt="${nombre} icon">`;
        }
    } catch (error) {
        icon = iconoPorDefecto;
    }
    return icon;
};

function obtenerEpigrafe(ruta) {
    if (ruta.includes('experience')) return 'Experiencia';
    if (ruta.includes('knowledge') && ruta.includes('studies')) return 'Formación';
    if (ruta.includes('knowledge') && ruta.includes('hardSkills')) return 'Habilidades';
    if (ruta.includes('aboutMe')) return 'Sobre mí';
    if (ruta.includes('manfredSpecificData')) return 'Trabajo deseado';
    return 'Otro';
}

/**
 * Devuelve un fragmento de texto donde aparece el término buscado.
 * @param {string} texto
 * @param {string} term
 * @returns {string}
 */
function obtenerFragmento(texto, term) {
    const idx = texto.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) return texto;
    const inicio = Math.max(0, idx - 20);
    const fin = Math.min(texto.length, idx + term.length + 20);
    let fragmento = texto.substring(inicio, fin);
    fragmento = fragmento.replace(
        new RegExp(term, 'ig'),
        match => `<mark>${match}</mark>`
    );
    return (inicio > 0 ? '...' : '') + fragmento + (fin < texto.length ? '...' : '');
}

/**
 * Busca un término en cualquier valor del objeto cv y devuelve epígrafe y descripción.
 * @param {Object} obj - Objeto donde buscar.
 * @param {string} term - Término a buscar (no sensible a mayúsculas).
 * @param {string} ruta - Ruta actual.
 * @returns {Array} - Lista de objetos {epigrafe, descripcion}.
 */
function buscarEnCVConDescripcion(obj, term, ruta = '') {
    let resultados = [];
    const lowerTerm = term.toLowerCase();

    if (typeof obj === 'string') {
        if (obj.toLowerCase().includes(lowerTerm)) {
            resultados.push({
                epigrafe: obtenerEpigrafe(ruta),
                descripcion: obtenerFragmento(obj, term)
            });
        }
    } else if (Array.isArray(obj)) {
        obj.forEach((item, i) => {
            resultados = resultados.concat(buscarEnCVConDescripcion(item, term, `${ruta}[${i}]`));
        });
    } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
            resultados = resultados.concat(
                buscarEnCVConDescripcion(obj[key], term, ruta ? `${ruta}.${key}` : key)
            );
        });
    }
    return resultados;
}

function search() {
    toggleChat('preguntarChat');
    const timestamp = Date.now();
    const inputId = `busquedaInput-${timestamp}`;
    const miInput = document.createElement('input');
    miInput.type = 'text';
    miInput.placeholder = '¿Qué quieres preguntar?';
    miInput.id = inputId;

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar';

    searchButton.addEventListener('click', () => {
        const resultados = buscarEnCVConDescripcion(cv, miInput.value);
        const div = document.getElementById('preguntarChat');
        if (resultados.length === 0) {
            div.innerHTML = '<div class="mensaje">No se encontraron coincidencias.</div>';
        } else {
            div.innerHTML = '<div class="mensaje">Encontrado el término <b>' + miInput.value + '</b> en:<ul>' +
                resultados.map(r =>
                    `<li><b>${r.epigrafe}</b>: <span style="color:#555">${r.descripcion}</span></li>`
                ).join('') +
                '</ul></div>';
        }
        div.style.display = 'block';
    });

    const preguntarChat = document.getElementById('preguntarChat');
    preguntarChat.innerHTML = '';
    preguntarChat.appendChild(miInput);
    preguntarChat.appendChild(searchButton);
}

// Muestra la caja de búsqueda superior
function mostrarBuscadorSuperior() {
    document.getElementById('buscadorSuperior').style.display = 'block';
    document.getElementById('inputBuscadorSuperior').focus();
}

// Cierra la caja de búsqueda superior
function cerrarBuscadorSuperior() {
    document.getElementById('buscadorSuperior').style.display = 'none';
    document.getElementById('resultadosBuscadorSuperior').innerHTML = '';
    document.getElementById('inputBuscadorSuperior').value = '';
}

// Busca usando la misma lógica que search()
function buscarDesdeSuperior() {
    const termino = document.getElementById('inputBuscadorSuperior').value;
    const resultados = buscarEnCVConDescripcion(cv, termino);
    const div = document.getElementById('resultadosBuscadorSuperior');
    if (!termino.trim()) {
        div.innerHTML = '';
        return;
    }
    if (resultados.length === 0) {
        div.innerHTML = '<div class="mensaje">No se encontraron coincidencias.</div>';
    } else {
        div.innerHTML = '<div class="mensaje">Encontrado el término <b>' + termino + '</b> en:<ul>' +
            resultados.map(r =>
                `<li><b>${r.epigrafe}</b>: <span style="color:#555">${r.descripcion}</span></li>`
            ).join('') +
            '</ul></div>';
    }
}

// Permite buscar con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('inputBuscadorSuperior');
    if (input) {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') buscarDesdeSuperior();
        });
    }
});