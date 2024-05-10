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
    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });

    const users = await request.json();

    updateTable(users);

    let listOfUsersOnHTMLTable = '';

    for (let user of users) {

        let del = '<button href="#" onclick="deleteUser(' + user.id + ')"> DELETE </button>'
        let userHTML = '<tr><td>' + user.id + '</td><td>' + user.firstName + ' ' + user.lastName + '</td><td>' + user.curp + '</td><td>' + user.credential + '</td><td> ' + del + ' </td></tr>';
        listOfUsersOnHTMLTable += userHTML;
    }

    document.querySelector('#users tbody').outerHTML = listOfUsersOnHTMLTable;
}

async function deleteUser(id){

    if(!confirm('¿Realmente quieres borrar este usuario?')){
        return;
    }

    const request = await fetch('api/deleteUser/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    })

    location.reload();

}