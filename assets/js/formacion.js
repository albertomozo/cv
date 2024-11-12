const skills = cv.knowledge.hardSkills;
const estudios = cv.knowledge.studies;
console.log('SKILLS ' + skills);
console.log('FORMACION ' + estudios);
estudios.forEach(est =>{
    //function mensaje(tipo, imgsrc, nombre,descripcion,fechaInicial,fechaFin){+
        console.log('mensaje(education,'+ ' ' + est.institution.image.link ,est.institution.name,est.name,est.startDate,est.finishDate );
        messageDiv = mensaje('education',est.institution.image.link,est.institution.name,est.name,est.startDate,est.finishDate);
    document.getElementById("educationChat").appendChild(messageDiv);

});

   // ficha
   ficha = '<h2>Formacion</h2>';
                
   ficha += `<p><strong>${estudios[0].finishDate} - ${estudios[0].institution.name} </strong> - ${estudios[0].name}   </p>`;
   document.getElementById('formacionItem').innerHTML = ficha;




let misSkills = '<ul class="skills-gallery">';
let skillsTodos = ''
skills.forEach(skill => {
    console.log('skill ' + skill.skill.name);
    misSkills += `
        <li class="skill-item">
            <img src="assets/img/logos/${skill.skill.name}.svg" width="50px" alt="${skill.skill.name}">
            <span>${skill.skill.name}</span>
        </li>
    `;
    skillsTodos += skill.skill.name + ', ';
});
misSkills += '</ul>';
document.getElementById("skillsChat").innerHTML = misSkills;
ficha = '<h2>Habilidades</h2>';
ficha += `<p>${skillsTodos}   </p>`;
   document.getElementById('skillsItem').innerHTML = ficha;

