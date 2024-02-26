document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn_extravio").addEventListener("click", function() {
        showForm("EXTRAVIO");
    });

    document.getElementById("btn_pendencia").addEventListener("click", function() {
        showForm("PENDÊNCIA");
    });
});

function showForm(option) {
    var root = document.getElementById("root");
    root.innerHTML = `
        <h1>${option}</h1>
        <label>Data Limite:</label>
        <input type="text" id="data_limite"  oninput="formatDate(this)" maxlength="10"><br>
        <label>Número CT-E ou NF:</label>
        <input type="text" id="num_cte"><br>
        <label>Número de Volumes:</label>
        <input type="number" id="num_volumes"><br>
        <button id="btn_visualizar">Visualizar</button>
        <button id="btn_submit">Imprimir</button>
        <div id="etiqueta_preview"></div>
    `;

    document.getElementById("btn_visualizar").addEventListener("click", function() {
        visualizeLabel(option);
    });

    document.getElementById("btn_submit").addEventListener("click", function() {
        submitForm(option);
    });
}


function visualizeLabel(option) {
    var dataLimiteInput = document.getElementById("data_limite");
    var dataLimite = dataLimiteInput.value;
    var formattedDataLimite = moment(dataLimite, "DD/MM/YYYY", true).format("DD/MM/YYYY");
    dataLimiteInput.value = formattedDataLimite;

    var numCte = document.getElementById("num_cte").value;
    var numVolumes = parseInt(document.getElementById("num_volumes").value);

    var newWindow = window.open("");
    
    // Calculando o tamanho das etiquetas
    var etiquetaWidth = 13; // 10 cm na horizontal
    var etiquetaHeight = 10; // 7 cm na vertical
    var espacoVertical = 1; // 1 cm de espaçamento vertical entre etiquetas

    for (var i = 1; i <= numVolumes; i++) {
        var labelText = `
            <div class="etiqueta-wrapper" style="width: ${etiquetaWidth}cm; height: ${etiquetaHeight}cm; margin-bottom: ${espacoVertical}cm;">
                <div class="etiqueta" style="border: 3px solid #0a0a0a; padding: 10px; height: 100%; position: relative;">
                    <img src="logo.png" alt="Logo da Empresa" style="position: absolute; bottom: 10px; right: 10px; width: 99%; height: auto;">
                    <h1 style="font-weight: bold; margin-bottom: 2vh; font-size: 5vw; text-align: center;">${option}</h1>
                    <p class="info" style="font-weight: bold; font-size: 1.8vw; font-size: 6vw;">Data Limite: <span>${formattedDataLimite}</span></p>
                    <p class="info" style="font-weight: bold; font-size: 1.8vw; font-size: 6vw;">Número ${option === "EXTRAVIO" ? "CT-E/NF-e" : "NF"}: <span>${numCte}</span></p>
                    <p class="info" style="font-weight: bold; font-size: 1.8vw; font-size: 6vw;">Volume: <span>${i}/${numVolumes}</span></p>
                    <p style="font-weight: bold; font-size: 1.8vw; font-size: 6vw;">* Tratativa via email.</p>
                </div>
            </div>
        `;
        
        newWindow.document.write(labelText);
        newWindow.document.write("<br>"); // Adiciona uma quebra de linha entre as etiquetas
    }

    // Adicionando estilos ao novo documento
    var cssLink = newWindow.document.createElement("link");
    cssLink.href = "styles.css";
    cssLink.rel = "stylesheet";
    newWindow.document.head.appendChild(cssLink);
    window.location.href = "index.html"; // Substitua "index.html" pelo caminho correto da sua página inicial

}





function submitForm(option) {
    var dataLimite = document.getElementById("data_limite").value;
    var numCte = document.getElementById("num_cte").value;
    var numVolumes = document.getElementById("num_volumes").value;

    if (option === "EXTRAVIO") {
        var labelText = `
            ${option}
            Data Limite: ${dataLimite}
            Número CT-E/NF-e: ${numCte}
            * Tratativa via email.
            UND 304
        `;
        previewLabel(labelText, numVolumes);
    } else if (option === "PENDÊNCIA") {
        var labelText = `
            ${option}
            Aguardar até: ${dataLimite}
            Número CT-E/NF-e: ${numCte}
            * Tratativa via email.
            UND 304
        `;
        previewLabel(labelText, numVolumes);
    }
}

function previewLabel(labelText, numVolumes) {
    for (var i = 1; i <= numVolumes; i++) {
        printLabel(labelText, i, numVolumes);
    }
}

function printLabel(labelText, sequenceNumber, totalLabels) {
    console.log(`Etiqueta ${sequenceNumber}/${totalLabels} impressa com sucesso!`);
}
function formatDate(input) {
    var value = input.value.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '$1/$2').replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3').replace(/\/\//g, '/').replace(/^(\d{2})\/(\d{2})\/(\d{4}).*/, '$1/$2/$3');
    input.value = value.substring(0, 10);
}
