// Check if Firebase app is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

function openLoginForm(role) {
    document.getElementById('loginFormTitle').innerText = role + ' Login';
    document.getElementById('loginForm').style.display = 'block';
}

function closeLoginForm() {
    document.getElementById('loginForm').style.display = 'none';
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            return userCredential.user.getIdToken();
        })
        .then(token => {
            // Store token and redirect
            localStorage.setItem('idToken', token);
            return fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });
        })
        .then(response => response.json())
        .then(data => {
            // Redirect based on role
            if (data.role === 'teacher') {
                window.location.href = '/teacher';
            } else if (data.role === 'student') {
                window.location.href = '/student';
            } else if (data.role === 'admin') {
                window.location.href = '/main-admin';
            } else if (data.role === 'local-admin') {
                window.location.href = '/local';
            } else if (data.role === 'ministry') {
                window.location.href = '/ministry';
            } else {
                console.error('Unknown role:', data.role);
                alert('Login successful but unknown role. Please contact support.');
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials and try again.');
        });
});
