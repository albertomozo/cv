const skills = cv.knowledge.hardSkills
const estudios = cv.knowledge.studies
console.log('SKILLS ' + skills);
console.log('FORMACION ' + estudios);
estudios.forEach(est =>{
    //function mensaje(tipo, imgsrc, nombre,descripcion,fechaInicial,fechaFin){+
        console.log('mensaje(education,'+ ' ' + est.institution.image.link ,est.institution.name,est.name,est.startDate,est.finishDate );
        messageDiv = mensaje('education',est.institution.image.link,est.institution.name,est.name,est.startDate,est.finishDate);
    document.getElementById("educationChat").appendChild(messageDiv);

}
);
let misSkills = '<ul class="skills-gallery">';
skills.forEach(skill => {
    console.log('skill ' + skill.skill.name);
    misSkills += `
        <li class="skill-item">
            <img src="assets/img/logos/${skill.skill.name}.svg" width="50px" alt="${skill.skill.name}">
            <span>${skill.skill.name}</span>
        </li>
    `;
});
misSkills += '</ul>';
document.getElementById("skillsChat").innerHTML = misSkills;

