let experiencia = cv.experience.jobs
console.log(experiencia);
experiencia.forEach(exp =>{
    console.log(exp);

    
       
                // Crear el contenedor del mensaje
                var messageDiv = document.createElement("div");
                messageDiv.className = "message experience";
    
                // Crear el logo de la empresa
                var logoDiv = document.createElement("div");
                logoDiv.className = "messageLogo";
                var img = document.createElement("img");
                img.src = exp.organization.image?.link;
                logoDiv.appendChild(img);
    
                // Crear el cuerpo del mensaje
                var bodyDiv = document.createElement("div");
                bodyDiv.className = "messageBody";
                var empresaDiv = document.createElement("div");
                empresaDiv.className = exp.organization.name;
                var h3 = document.createElement("h3");
                h3.textContent = exp.organization.name;
                empresaDiv.appendChild(h3);
                bodyDiv.appendChild(empresaDiv);
                bodyDiv.appendChild(document.createTextNode(exp.roles[0]?.name));
                
    
                // Crear el contenedor de otros detalles
                var otrosDiv = document.createElement("div");
                otrosDiv.className = "messageOtros";
                var otrosSmall = document.createElement("small");
                otrosSmall.textContent = exp.roles[0].startDate + ' - ' +  exp.roles[0].finishDate  + '✔';
                otrosDiv.appendChild(otrosSmall);
    
                // Añadir todos los elementos al contenedor del mensaje
                messageDiv.appendChild(logoDiv);
                messageDiv.appendChild(bodyDiv);
                messageDiv.appendChild(otrosDiv);
    
                // Añadir el mensaje al contenedor de mensajes
                document.getElementById("experienceChat").appendChild(messageDiv);
        








})

