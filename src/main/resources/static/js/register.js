$(document).ready(function() {

})

function register(){
    userAlreadyExist()
}

//To check if the user already exist
async function userAlreadyExist() {

    let curp = document.getElementById('txtCURP').value

    const findByCurp = await fetch('api/userByCurp/' + curp, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const listOfCurp = await findByCurp.json();

    if(listOfCurp.length >= 1){
        alert('Usuario ya registrado')
        document.getElementById("contF").reset();
        
    }else{
        saveInDataBase();
        alert('Usuario registrado con exito')
        document.getElementById("contF").reset();
        location.reload();
    }

}

//To register the email on database
async function saveInDataBase(){

    let data = {};
    data.firstName = document.getElementById('txtFirstName').value;
    data.lastName = document.getElementById('txtLastName').value;
    data.cellphone = document.getElementById('numCellphone').value;
    data.emergencyCellphone = document.getElementById('numSosPhone').value;
    data.curp = document.getElementById('txtCURP').value;
    data.password = document.getElementById('txtPassword').value;

    const registerUser = fetch('api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
    })

}

