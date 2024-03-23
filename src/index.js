firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "/src/home.html";
    }
});

function login() {
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        window.location.href = "/src/home.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function recoverPassword() {
    firebase.auth().sendPasswordResetEmail(form.emailRecover().value).then(() => {
        alert("Email enviado com sucesso!")
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário nao encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    if (error.code == "auth/missing-email") {
        return "Não há nenhum email digitado"
    }
    if (error.code == "auth/invalid-credential") {
        return "Algum campo não foi inserido corretamente"
    }
    if (error.code == "auth/invalid-email") {
        return "Email inválido"
    }
    if (error.code == "auth/missing-password") {
        return "Digite a sua senha"
    }
    return error.message;
}

const form = {
    email: () => document.getElementById("email"),
    password: () => document.getElementById("password"),
    loginButton: () => document.getElementById("buttonLogin"),
    emailRecover: () => document.getElementById("emailRecover")
}