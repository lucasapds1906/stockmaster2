// let buttonLogin = document.getElementById("buttonLogin");

// buttonLogin.addEventListener('click', () => {
//     let email = document.getElementById("inputEmail").value;
//     let password = document.getElementById("inputSenha").value;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(response => {
//         window.location.href = "home.html";  
//     })
//     .catch(error => {
//         alert(getErrorMessage(error));
//     });
// })



main.js
let c = document.querySelector('#create');
let r = document.querySelector('#read');
let u = document.querySelector('#update');
let d = document.querySelector('#delete');

// BUTTON CREATE

c.addEventListener('click', () => {

    alert("Usuário cadastrado com sucesso.")

    fetch('https://bdcloud-9f12f-default-rtdb.firebaseio.com/pessoas.json', {

        method: 'POST',
        body: JSON.stringify(
            {
                nome: document.getElementById('nome').value,
                idade: document.getElementById('idade').value
            }
        )


    })
    .then(response => response.json()) // TRANSFORMA O ARQUIVO PARA .JSON
    .then(data => console.log(response.data)) // ACESSA OS DADOS
    .catch(error => console.log(error)) // TRATAMENTO DE ERROS

})

// BUTTON READ

r.addEventListener('click', () => {

})

// BUTTON UPDATE

u.addEventListener('click', () => {

})

// BUTTON DELETE

d.addEventListener('click', () => {

})