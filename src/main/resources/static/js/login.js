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
        //INCERTAR CODIGO PARA REGISTRAR TIEMPO
        var time = document.getElementById('watch').innerText;

        saveTime(data.credential, time);

        alert("Tiempo registrado")
        //window.location.href = 'home.html'
        return;
    } else {
        alert("Credencial o contraseña erronea, intenta de nuevo")
    }
}

/** To send info to back-end */
async function saveTime(credential, time){

    let info = {};
    info.credential = credential;
    info.time = time;

    const response = await fetch('api/saveTime/in', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    });
  
}