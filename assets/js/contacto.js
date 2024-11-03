const datos = cv.aboutMe
console.log(datos);
const settings = cv.careerPreferences
let  estado ='sin buscar trabajo'
if (settings.status === 'searchingActively'){
    estado = 'En Busqueda activa';
}

let otrosDatos = '';
const urls = [];
urls['linkedin'] = '<i class="fa-brands fa-linkedin"></i>';
urls['github'] = '<i class="fa-brands fa-github"></i>';
urls['notion'] = '<i class="fa-solid fa-link"></i>';
settings.contact.publicProfiles.forEach(pub => {
    otrosDatos += `<div><a href="${pub.URL}" target="_blank">${urls[pub.type]}</a></div>`;
});
otrosDatos += `</div>`;


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



