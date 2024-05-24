$(document).ready(function () { });

async function login() {

    let data = {};
    data.credential = document.getElementById('txtCredential').value;
    data.password = document.getElementById('txtPassword').value;

    if (data.credential == "") {
        alert("Ingresa credencial")
        return;
    }

    /** To check if the credential is registered */
    const findByCredential = await fetch('api/userByCredential/' + data.credential, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const listOfCredential = await findByCredential.json()

    if (listOfCredential.length == 0) {
        alert('Usuario no registrado')
        location.reload();
        return;
    }

    /** To login */
    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await request.json();

    if (response) {
        alert("Tiempo registrado")
        window.location.href = 'home.html'
        //INCERTAR CODIGO PARA REGISTRAR TIEMPO
        return;
    } else {
        alert("Credencial o contraseña erronea, intenta de nuevo")
    }
}