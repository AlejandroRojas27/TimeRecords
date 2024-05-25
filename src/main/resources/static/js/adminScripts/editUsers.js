$(document).ready(function() {

})

//REQUIRE AUTHORIZATION TOKEN
async function deleteUser(id) {
    if (!confirm('¿Realmente quieres borrar este usuario?')) { return; }
    const request = await fetch('api/deleteUser/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    })
    location.reload();
}

//REQUIRE AUTHORIZATION TOKEN
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

    let saveButton = '<button href="#" onclick="saveChanges(userGlobal)"> GUARDAR CAMBIOS </button>'
    document.querySelector('#formB').outerHTML = saveButton;

}

//REQUIRE AUTHORIZATION TOKEN
async function saveChanges(user) {

    user.firstName = document.getElementById('txtFirstNameEdit').value;
    user.lastName = document.getElementById('txtLastNameEdit').value;
    user.cellphone = document.getElementById('numCellphoneEdit').value;
    user.emergencyCellphone = document.getElementById('numSosphoneEdit').value;
    user.hierarchy = document.getElementById('numHierarchyEdit').value;

    const updateUser = fetch('api/updateUser', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(user),
    })

    alert('Cambios guardados')
    location.reload();
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}