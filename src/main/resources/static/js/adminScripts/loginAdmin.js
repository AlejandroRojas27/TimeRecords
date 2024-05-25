$(document).ready(function () {
})

//TO VALIDATE IF USER HAVE ADMIN HIERARCHY
async function validUser() {

    let data = {};
    data.credential = document.getElementById('txtCredential').value;
    data.password = document.getElementById('txtPassword').value;

    //To check that the form is not empty
    if (data.credential == "" || data.password == "") {
        alert("Ingresa tu credencial y contraseña")
        window.location.reload();
        return;
    }

    /** To check if the credential is registered */
    const findByCredential = await fetch('api/userByCredential/' + data.credential, {
        method: 'GET',
        headers: getHeaders(),
    })

    const listOfCredential = await findByCredential.json()

    if (listOfCredential.length == 0) {
        alert('Usuario no registrado')
        window.location.href = 'home.html';
        return;
    }

    /**To check the hierarchy of the user, it must have the correct hierarchy or the access must be denied*/
    const isAdmin = await fetch('api/isUserAdmin/' + data.credential, {
        method: 'GET',
        headers: getHeaders(),
    })

    const response = await isAdmin.json();

    if (!response) {
        alert("El usuario no tiene acceso a estos servicios");
        window.location.href = 'home.html';
    } else {
        loginAdminAuth(data);
    }

}

async function loginAdminAuth(data) {
    
    console.log(data);

    const login = await fetch('api/authLogin', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    })

    const response = await login.text();

    if (response != "FAIL") {
    
        localStorage.token = response;
        window.location.href = 'admin.html'

        return;
    } else {
        alert("Credencial o contraseña erronea, intenta de nuevo")
    }

}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
}