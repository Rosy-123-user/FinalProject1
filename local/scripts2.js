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
function openSlideIn(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            const slideInContainer = document.getElementById('slide-in-container');
            slideInContainer.innerHTML = data;
            const slideIn = slideInContainer.querySelector('.slide-in');
            slideIn.style.width = '100%';
            slideInContainer.style.display = 'block';
        })
        .catch(error => console.error('Error loading slide-in content:', error));
}

// Function to close slide-in
function closeSlideIn(id) {
    const slideIn = document.getElementById(id);
    if (slideIn) {
        slideIn.style.width = '0';
        setTimeout(() => {
            slideIn.parentElement.style.display = 'none';
            slideIn.remove();
        }, 500); // Remove from DOM after transition
    }
}

function showDetails(type) {
    const detailsContent = document.getElementById('details-content');
    let content = '';
    if (type === 'teachers') {
        content = `
            <h3>Teacher Accounts</h3>
            <div class="account-actions">
                <button class="action-button">View</button>
                <button class="action-button">Edit</button>
                <button class="action-button">Deactivate</button>
            </div>
            <p>Details about teachers will be displayed here.</p>
        `;
    } else if (type === 'students') {
        content = `
            <h3>Student Accounts</h3>
            <div class="account-actions">
                <button class="action-button">View</button>
                <button class="action-button">Edit</button>
                <button class="action-button">Deactivate</button>
            </div>
            <p>Details about students will be displayed here.</p>
        `;
    } else if (type === 'bulk') {
        content = `
            <h3>Bulk Operations</h3>
            <div class="bulk-upload-section">
                <form id="bulk-upload-form" onsubmit="uploadBulkAccounts(event)">
                    <input type="file" id="bulk-file" accept=".csv, .xlsx" required>
                    <button type="submit">Upload</button>
                </form>
            </div>
        `;
    }
    detailsContent.innerHTML = content;
}

// Functions for creating accounts
function showCreateForm() {
    document.getElementById('create-form-modal').style.display = 'block';
}

function closeCreateForm() {
    document.getElementById('create-form-modal').style.display = 'none';
}

function createAccount(event) {
    event.preventDefault();
    console.log("Create account function triggered");


    const firstName =document.getElementById('first-name').value;
    const lastName =document.getElementById('last-name').value;
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const program = document.getElementById('program').value;

    console.log({ firstName, lastName, email, password, role, program });

    // Get the authentication token
    const idToken = localStorage.getItem('idToken'); // Assuming the token is stored in localStorage

    fetch('/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ firstName, lastName, role, email, password, program })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.message) {
            alert(data.message);
        } else if (data.error) {
            alert('Error: ' + data.error);
        }
        closeCreateForm();
    })
    .catch(error => {
        console.error('Error creating account:', error);
        alert('Failed to create account. See console for details.');
    });
}

// Functions for bulk upload accounts
function uploadBulkAccounts(event) {
    event.preventDefault();
    const fileInput = document.getElementById('bulk-file');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/api/users/bulk-upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error uploading bulk accounts:', error);
        alert('Failed to upload bulk accounts.');
    });
}


