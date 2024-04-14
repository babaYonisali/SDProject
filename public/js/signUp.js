function signup() {
    const signupForm = document.getElementById('signupForm');
    const formData = new FormData(signupForm);

    fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
            role: formData.get('role')
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to sign up');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/index.html'
        console.log(data);
    })
    .catch(error => {
        // Handle error
        console.error('Error signing up:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        signup();
    });
});
