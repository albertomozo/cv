function toggleChat(chatId) {
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