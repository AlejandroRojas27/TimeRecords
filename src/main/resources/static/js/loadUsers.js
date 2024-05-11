$(document).ready(function () {
    loadUsers();
    $('users').DataTable();
})

async function updateTable(users) {
    for (let user of users) {
        let fullName = user.firstName + ' ' + user.lastName;
        document.getElementById('userName').outerHTML = '<div class="nameStyle" id="userName">' + fullName + '</div>';
        return;
    }
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
}

async function loadUsers() {
    const users = await askForUsers();
    updateTable(users);

    let listOfUsersOnHTMLTable = '';

    for (let user of users) {
        let del = '<button href="#" onclick="deleteUser(' + user.id + ')"> BORRAR </button>'
        let edit = '<button href="#" onclick="editUser(' + user.id + ')"> EDITAR </button>'
        let userHTML = '<tr><td>' + user.id +
            '</td><td>' + user.firstName + ' ' + user.lastName +
            '</td><td>' + user.curp +
            '</td><td>' + user.credential +
            '</td><td> ' + del +
            '</td><td> ' + edit +
            ' </td></tr>';
        listOfUsersOnHTMLTable += userHTML;
    }

    document.querySelector('#users tbody').outerHTML = listOfUsersOnHTMLTable;
}

async function deleteUser(id) {
    if (!confirm('¿Realmente quieres borrar este usuario?')) { return; }
    const request = await fetch('api/deleteUser/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    })
    location.reload();
}

async function askForUsers() {
    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}

async function editUser(id) {

    const request = await fetch('api/userById/' + id, {
        method: 'GET',
        headers: getHeaders()
    })

    const user = await request.json()
    window.userGlobal = user;

    let firstNameToForm = '<div>' + ' <p>Nombre(s): <input type="text" id="txtFirstNameEdit" placeholder="Nombre(s)"></p>' + '</div>';
    let lastNameToForm = '<div>' + ' <p>Apellidos: <input type="text" id="txtLastNameEdit" placeholder="Apellidos"></p>' + '</div>';
    let cellphoneToForm = '<div>' + ' <p>Telefono: <input type="tel" id="numCellphoneEdit"></p>' + '</div>';
    let sosPhoneToForm = '<div>' + ' <p>Telefono de emergencia: <input type="tel" id="numSosphoneEdit"></p>' + '</div>';
    let hierarchyToForm = '<div>' + ' <p>Jerarquia: <input type="number" id="numHierarchyEdit" min="1" max="100" step="1"></p>' + '</div>';

    let formEdit = '<form>' +
        firstNameToForm +
        lastNameToForm +
        cellphoneToForm +
        sosPhoneToForm +
        hierarchyToForm + '</form>' + 
        '<button href="#" id="formB"> GUARDAR CAMBIOS </button>';

    document.querySelector('#contEdit').outerHTML = formEdit;

    document.getElementById('txtFirstNameEdit').value = user.firstName;
    document.getElementById('txtLastNameEdit').value = user.lastName;
    document.getElementById('numCellphoneEdit').value = user.cellphone;
    document.getElementById('numSosphoneEdit').value = user.emergencyCellphone;
    document.getElementById('numHierarchyEdit').value = user.hierarchy;

    let saveButton ='<button href="#" onclick="saveChanges(userGlobal)"> GUARDAR CAMBIOS </button>'
    document.querySelector('#formB').outerHTML = saveButton;

}

async function saveChanges(user){

    user.firstName = document.getElementById('txtFirstNameEdit').value;
    user.lastName = document.getElementById('txtLastNameEdit').value;
    user.cellphone = document.getElementById('numCellphoneEdit').value;
    user.emergencyCellphone = document.getElementById('numSosphoneEdit').value;
    user.hierarchy = document.getElementById('numHierarchyEdit').value;

    console.log(user)

    const updateUser = fetch('api/updateUser', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(user), 
    })

    alert('Cambios guardados')
    location.reload();
}