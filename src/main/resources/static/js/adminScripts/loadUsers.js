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

//REQUIRE AUTHORIZATION TOKEN
async function askForUsers() {
    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });
    return await request.json();
}
