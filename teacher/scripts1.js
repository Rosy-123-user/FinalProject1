// Function to load module content dynamically
function loadModuleContent(moduleFile) {
    console.log(`Loading module content from: ${moduleFile}`);
    fetch(moduleFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById('module-content').innerHTML = data;
            openSlideIn('module-details');
        })
        .catch(error => console.error('Error loading module content:', error));
}

// Function to open slide-in
function openSlideIn(id) {
    console.log(`Opening slide-in: ${id}`);
    document.getElementById(id).style.width = '100%';
}

// Function to close slide-in
function closeSlideIn(id) {
    console.log(`Closing slide-in: ${id}`);
    document.getElementById(id).style.width = '0';
}
