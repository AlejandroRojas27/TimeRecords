$(document).ready(function() {
    authToken();
});

async function authToken(){
    
    const request = await fetch('api/authToken', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })

    const response = await request.json();

    if(!response){
        alert('Usuario no permitido')
        window.location.href = 'home.html';
    }

}