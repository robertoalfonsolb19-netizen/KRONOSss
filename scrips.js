document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const logPanel = document.getElementById('log-panel');
    const infoPanel = document.getElementById('info-panel');
    const descriptionPanel = document.getElementById('description-panel');
    const terminalInput = document.getElementById('terminal-input');
    // Usamos querySelector para buscar el prompt dentro del logPanel para asegurar la inserción
    const promptElement = document.querySelector('.terminal-prompt'); 

    // --- BASE DE DATOS DE PROYECTOS (URLs) ---
    const projectKeywords = {
        'web basica': 'https://pagiina-basica.vercel.app',
        'proyecto 1': 'https://html-basico-seven.vercel.app',
        'proyecto 2': 'https://proyecto-2-theta.vercel.app',
        'proyecto 3': 'https://proyecto-3-alpha.vercel.app',
        'proyecto 4': 'https://goku-silk.vercel.app',
        'proyecto 5': 'https://proyecto-5-topaz.vercel.app',
        'proyecto 6': 'https://proyecto-6-six.vercel.app',
        'proyecto 16': 'https://rap-two.vercel.app',
        'proyecto 17': 'https://rekky-sensen.vercel.app',
        'proyecto 18': 'https://proyecto-18-seven.vercel.app',
        'proyecto 19': 'https://pokerrr.vercel.app',
        'menu 1': 'https://menu-bonito.vercel.app',
        'toogle': 'https://toogle-sand.vercel.app',
        'dark theme': 'https://dark-pi-kohl.vercel.app'
    };

    // --- BASE DE DATOS DE DESCRIPCIONES ---
    const projectDescriptions = {
        'proyecto 1':  'Proyecto 1: El primer proyecto puesto por la profesora Keila, proyecto estilo anuncio personalizado.',
        'proyecto 2':  'Proyecto 2: El segundo proyecto donde hicimos una tarjeta que reacciona al paso del mouse y que esta contiene un elemento flotante.',
        'proyecto 3':  'Proyecto 3: El tercer proyecto pagina avanzada interactiva y navegación fluida que imita la pagina de netflix.',
        'proyecto 4':  'Proyecto 4: El cuarto proyecto una pagina con varias cartas con una animación suave que muestra info de cada una.',
        'proyecto 5':  'Proyecto 5: El quinto proyecto es una pagina de inicio de sesion con un css maravilloso.',
        'proyecto 6':  'Proyecto 6: El sexto proyecto una pagina maravillosa con una breve descripción con uno de los mejores autos de la historia.',
        'proyecto 16': 'Proyecto 16: El decimosexto proyecto una pagina con unos colores excelentes y unos de los raps mas épicos de rekkyo sensen.',
        'proyecto 17': 'Proyecto 17: El decimoséptimo proyecto una pagina fan de rekkyo sensen donde se da el contexto de la serie y te invita a leerla.',
        'proyecto 18': 'Proyecto 18: El decimoctavo proyecto una pagina simple donde se muestran cajas de colores con algunos iconos.',
        'proyecto 19': 'Proyecto 19: El decimonoveno otro proyecto de cartas pero algo menos sencillo con colores mas dinámicos.',
        'web basica':  'Primer ejemplo de sitio minimalista con HTML puro puesto para retroalimentar nuestros conocimientos en HTML.',
        'menu 1':      'Este menú con un aspecto minimalista y diversas animaciones y unos colores que te dejarán cautivado, sinceramente, uno de los mejores menús que he visto.',
        'toogle':      'Un simple boton donde todo esta animado de una forma hermosa , donde luego muestra una linda animacion y muestra un lindo cartel que solo dice la verdad',
        'dark theme':  'un interumtor que cambia por completo el tono de la pagina'
    };

    // Función: Añadir líneas al log
    function addLogEntry(text) {
        if (!logPanel || !promptElement) return;
        const newLog = document.createElement('p');
        newLog.innerHTML = text;
        logPanel.insertBefore(newLog, promptElement);
        logPanel.scrollTop = logPanel.scrollHeight;
    }

    // Función: Limpiar panel
    function clearInfoPanel() {
        if (infoPanel) {
            infoPanel.innerHTML = '<p class="placeholder-text">Panel de visualización<br>Esperando comando...</p>';
        }
        if (descriptionPanel) {
            descriptionPanel.innerHTML = '<p class="placeholder-text">Sin descripción asignada.</p>';
        }
        addLogEntry('Panel de visualización limpiado.');
    }

    // Función: Mostrar info del proyecto (CORREGIDA LA RUTA DE IMAGEN)
    function showProjectInfo(projectName, url) {
        if (!infoPanel || !descriptionPanel) return;

        infoPanel.innerHTML = '';
        
        // CORRECCIÓN CLAVE: Reemplaza espacios por guiones bajos para nombres de archivo
        const normalizedName = projectName.toLowerCase().replace(/\s/g, '_').trim(); 
        const imageName = `${normalizedName}.png`;
        const imagePath = `./img/${imageName}`;

        const container = document.createElement('div');
        container.className = 'preview-container';
        container.innerHTML = `
            <p>Proyecto: <strong>${projectName.toUpperCase()}</strong></p>
            <img src="${imagePath}" alt="${projectName}" class="preview-img">
            <button class="terminal-button">Visitar proyecto</button>
        `;

        container.querySelector('button').onclick = () => window.open(url, '_blank');
        infoPanel.appendChild(container);

        // Actualizar panel externo
        const desc = projectDescriptions[projectName] || 'Sin descripción asignada.';
        descriptionPanel.innerHTML = `
            <h3>${projectName.toUpperCase()}</h3>
            <p>${desc}</p>
        `;

        addLogEntry(`Proyecto ${projectName.toUpperCase()} en pantalla.`);
    }

    // Función: Subir archivo por comando
    function uploadProject(keyword) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.html,.zip';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const fileURL = URL.createObjectURL(file);
            projectKeywords[keyword] = fileURL;
            localStorage.setItem('projectData', JSON.stringify(projectKeywords));

            addLogEntry(`Archivo "${file.name}" vinculado a la palabra clave "${keyword}".`);
            document.body.removeChild(fileInput);
        });

        fileInput.click();
    }

    // Función: Panel visual de subida
    function showUploadPanel() {
        if (!infoPanel) return;
        
        infoPanel.innerHTML = '';
        const uploadContainer = document.createElement('div');
        uploadContainer.className = 'preview-container';
        uploadContainer.innerHTML = `
            <p>Asocia un archivo con una palabra clave:</p>
            <input type="text" id="upload-keyword" placeholder="Ej: proyecto 7">
            <input type="file" id="upload-file" accept=".html,.zip">
            <button class="terminal-button" id="upload-btn">Subir y vincular</button>
        `;
        infoPanel.appendChild(uploadContainer);

        document.getElementById('upload-btn').onclick = () => {
            const keyword = document.getElementById('upload-keyword').value.trim().toLowerCase();
            const file = document.getElementById('upload-file').files[0];
            if (!keyword || !file) {
                addLogEntry('Error: Debes ingresar una palabra clave y seleccionar un archivo.');
                return;
            }
            const fileURL = URL.createObjectURL(file);
            projectKeywords[keyword] = fileURL;
            localStorage.setItem('projectData', JSON.stringify(projectKeywords));
            addLogEntry(`Archivo "${file.name}" vinculado a "${keyword}".`);
        };
    }

    // Función: PROCESAR COMANDOS
    function processCommand(command) {
        if (command.startsWith('upload ')) {
            const keyword = command.replace('upload ', '').trim();
            if (!keyword) {
                addLogEntry('Uso: upload [nombre del proyecto]');
                return;
            }
            uploadProject(keyword);
            return;
        }

        if (command === 'upload panel') {
            showUploadPanel();
            return;
        }

        // Si el comando coincide con una clave de proyecto (URL)
        if (projectKeywords[command]) {
            const url = projectKeywords[command];
            showProjectInfo(command, url);
            return;
        }

        switch (command) {
            case 'list heroes':
                addLogEntry('⚠️ ERROR: Función "list heroes" no definida. Omisión.');
                break;
            case 'clear':
            case 'cls':
                clearInfoPanel();
                break;
            default:
                addLogEntry(`Comando no reconocido: "${command}".`);
        }
    }

    // Listener para INPUT: Detectar ENTER
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                if (command === '') return;

                addLogEntry(`> ${command}`);
                terminalInput.value = '';
                processCommand(command);
            }
        });
    }

    // --- INICIALIZACIÓN ---
    
    // Inicia el panel de información vacío
    clearInfoPanel();

    // Mensajes iniciales (se ejecutan solo una vez)
    addLogEntry('Iniciando secuencia de revelación...');
    addLogEntry('Accediendo a la base de datos "KRONOS"...');
    addLogEntry('Comandos disponibles:');
    addLogEntry('- clear → limpia el panel de información');
    addLogEntry('- upload panel → abrir interfaz visual');
    addLogEntry('Escriba un nombre de proyecto (ej: "proyecto 1") para verlo.');
});