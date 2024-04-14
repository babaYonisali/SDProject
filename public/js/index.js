document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signUpButton=document.getElementById('signUp')
    function login(loginInf){
    fetch("/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInf)
    })
    .then(response=>{
        if (response.status===404) {
            console.log("user is not found")
        }
        return response.json();
    })
    .then(data =>{
        switch (data.role) {
            case 'admin':
                window.location.href = `/html/admin.html?username=${encodeURIComponent(username)}`;
                break;
            case 'manager':
                window.location.href = `/html/manager.html?username=${encodeURIComponent(username)}`;
                break;
            case 'applicant':
                window.location.href = `/html/applicant.html?username=${encodeURIComponent(username)}`;
                break;
            default:
                console.error('Unknown role:', data.role);
                // Handle unknown role
                break;
        }
    })
    .catch(error => {
            // Handle network errors or other errors
            console.error('Error during login:', error);
        });
}
loginForm.addEventListener('submit',event=>{
    event.preventDefault();
    const formData = new FormData(loginForm);
        const userData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };
    login(userData)
})
signUpButton.addEventListener('click',()=>{
    window.location.href='/html/signUp.html'
})

});


