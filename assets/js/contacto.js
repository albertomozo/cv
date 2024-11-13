const datos = cv.aboutMe;
console.log(datos);
const settings = cv.careerPreferences;

let estado = 'sin buscar trabajo';
if (settings.status === 'searchingActively') {
    estado = 'En Búsqueda Activa';
}




const generarDatosPublicProfiles = async () => {
    const contenedor = document.createElement('div');
    contenedor.className = 'otraInfo';

    for (let pub of datos.relevantLinks) {
        
        let iconoBuscar = pub.type.toLowerCase();
        console.log('iconoBuscar:', iconoBuscar); // Verifica el valor

        let iconoHTML;
        if (iconoBuscar === 'other') { 
            console.log("Tipo 'other' encontrado, asignando icono");
            iconoHTML = `<img src="assets/img/logos/link-svgrepo-com.svg" alt="link icon">`;
        } else {
            iconoHTML = await obtenerIcon(iconoBuscar);
        }

        const div = document.createElement('div');
        const link = document.createElement('a');
        link.href = pub.URL;
        link.target = "_blank";

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = iconoHTML;
        const iconoElemento = tempDiv.firstChild;
        
        link.appendChild(iconoElemento);
        div.appendChild(link);
        contenedor.appendChild(div);
    }

    console.log(contenedor); // Verifica el contenedor final
    return contenedor;
};

// Función principal para generar el contenido de la sección de datos personales
const generarDatosPersonales = async () => {
    const otrosDatosContenedor = await generarDatosPublicProfiles();

    const fichaDiv = document.createElement('div');
    fichaDiv.className = "ficha";
    
    // Agregar la imagen de perfil
    const logoP = document.createElement('p');
    logoP.className = "logo";
    const img = document.createElement('img');
    img.src = datos.profile.avatar.link;
    logoP.appendChild(img);
    fichaDiv.appendChild(logoP);

    // Añadir el nombre, estado y título
    fichaDiv.innerHTML += `<p>${datos.profile.name} ${datos.profile.surnames}</p>`;
    fichaDiv.innerHTML += `<p>${estado}</p>`;
    fichaDiv.innerHTML += `<p>${datos.profile.title}</p>`;

    // Contenedor general que se añadirá al DOM
    const contenedorGeneral = document.createElement('div');
    contenedorGeneral.className = "datosPersonales";
    contenedorGeneral.appendChild(fichaDiv);
    contenedorGeneral.appendChild(otrosDatosContenedor);

    document.getElementById('personalChat').appendChild(contenedorGeneral);
};

// Llamar a la función principal para generar y mostrar los datos personales
generarDatosPersonales();


// ficha
let ficha = `<h2>${datos.profile.name} ${datos.profile.surnames}</h2>`
ficha += `<p>${datos.profile.title}</p>`;
document.getElementById('personalItem').innerHTML = ficha;
let imagen = `<img src="${datos.profile.avatar.link}">`;

document.getElementById('personalIcon').innerHTML = imagen;

if (cv.manfredSpecificData.desiredJobDescription != undefined){
    document.getElementById('desiredChat').innerHTML = cv.manfredSpecificData.desiredJobDescription ;
} else {
    document.getElementById('desiredItem').style.display = 'none';
}