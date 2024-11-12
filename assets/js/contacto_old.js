const datos = cv.aboutMe
console.log(datos);
const settings = cv.careerPreferences
let  estado ='sin buscar trabajo'
if (settings.status === 'searchingActively'){
    estado = 'En Busqueda activa';
}

let otrosDatos = '';
/* sistema manual de asignacion de iconos  */
const urls = [];
urls['linkedin'] = '<i class="fa-brands fa-linkedin"></i>';
urls['github'] = '<i class="fa-brands fa-github"></i>';
urls['notion'] = '<i class="fa-solid fa-link"></i>';


settings.contact.publicProfiles.forEach(pub => {


    //otrosDatos += `<div><a href="${pub.URL}" target="_blank">${urls[pub.type]}</a></div>`;
    

    //const icono = obtenerIcon(pub.type);

    const mostrarIcon = async (nombre) => {
        const iconoHTML = await obtenerIcon(pub.type); // Usa await para obtener el resultado de obtenerIcon
        //document.getElementById("icon-container").innerHTML = iconoHTML; // Agrega el icono al contenedor
        otrosDatos += `<div><a href="${pub.URL}" target="_blank">${iconoHTML}</a></div>`;
    };



    //otrosDatos += `<div><a href="${pub.URL}" target="_blank">${icono}</a></div>`;
});
otrosDatos += `</div>`;


const generarDatosPublicProfiles = async () => {
    for (const pub of settings.contact.publicProfiles) {
        // Obtener el icono de forma asincrónica
        const iconoHTML = await obtenerIcon(pub.type);
        otrosDatos += `<div><a href="${pub.URL}" target="_blank">${iconoHTML}</a></div>`;
    }
    // Aquí puedes hacer algo con otrosDatos, como añadirlo al DOM después de completarlo
    //document.getElementById("icon-container").innerHTML = otrosDatos;
};

// Llama a la función para generar y mostrar todos los iconos
generarDatosPublicProfiles();


/* bloque para incluir datos personales  - descomentar para incluir tel y correo*/
/* const textoDatos =  `<div class="datosPersonales"><div class="ficha"><p class="logo"><img src="${datos.profile.avatar.link}"/></p>
<p>${datos.profile.name} ${datos.profile.surnames}</p>
<p><i class="fa-solid fa-phone"></i> + 34 ${settings.contact.contactTel[0]}</p>
<p><i class="fa-solid fa-envelope"></i> ${settings.contact.contactMails[0]}</p>

<p>${estado}</p>
<p>${datos.profile.title}</p></div></div><div class="otraInfo">${otrosDatos}</div>`; */

const textoDatos =  `<div class="datosPersonales"><div class="ficha"><p class="logo"><img src="${datos.profile.avatar.link}"/></p>
<p>${datos.profile.name} ${datos.profile.surnames}</p>


<p>${estado}</p>
<p>${datos.profile.title}</p></div></div><div class="otraInfo">${otrosDatos}</div>`;

document.getElementById('personalChat').innerHTML = textoDatos;



