function logOutAdmin() {

    if (confirm("¿Deseas cerrar sesión?")) {
        localStorage.removeItem('token');
        window.location.href = 'home.html'
    }
}