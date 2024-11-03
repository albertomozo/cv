const datos = cv.aboutMe
console.log(datos);

const textoDatos =  `<div class="datosPersonales"><div class="ficha"><p class="logo"><img src="${datos.profile.avatar.link}"/></p>
<p>${datos.profile.name} ${datos.profile.surnames}</p>
<p>${datos.profile.title}</p></div><div class="ortraInfo">Otra Info</div></div>`;

document.getElementById('personalChat').innerHTML = textoDatos;
