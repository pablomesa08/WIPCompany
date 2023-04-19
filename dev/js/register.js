const registerURL = "";

const usernameURL = "";
const emailURL = "";

var isPasswordAcceptable = false;
var isEmailAcceptable = false;
var isUsernameAcceptable = false;

//para funcionamiento correcto hacer llamados en funcion de eventos pero con intervalos fijos de tiempo entre peticiones

async function register(){
    if(isPasswordAcceptable && isEmailAcceptable && isUsernameAcceptable){
        user = getInfo();
        customHeaders = {

        };

        fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(user),
        })
        .then((response) => response.stringify())
        .then((data) => {
            //revisar si la respuesta fue buena
        })
        .catch((error) => {
            console.log(error);
            //indicar que no se pudo registrar al usuario
        })
    }
    //no se puede registrar todavia
}

function getInfo(){
    let username = ""/*document.getElementById("username").value*/;
    let password = ""/*document.getElementById("password").value*/;
    let email = ""/*document.getElementById("email").value*/;
    let primerNombre = ""/*document.getElementById("email").value*/;
    let segundoNombre = ""/*document.getElementById("email").value*/;
    let apellidos = ""/*document.getElementById("email").value*/;
    let idGenero = ""/*document.getElementById("email").value*/;
    let fechaNacimiento = ""/*document.getElementById("email").value*/;

    return {username, password, email, primerNombre, segundoNombre, apellidos, idGenero, fechaNacimiento};
}

function checkNull(data, element){

    if(data = "")
        return false;//se dice que el campo no se puede recibir todavia

}

//revisar si el usuario cumple con los requisitos y no esta repetido
async function checkUsername(){
    let username = ""/*document.getElementById("username").value*/;
    let customHeaders = {
        "Content-type" : "application/json; charset=UTF-8"
    };
    
    if (password.length > 50)//usuario muy largo
        return false;

    //verificacion de si el usuario esta repetido
    fetch(usernameURL, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(username),
    })
    .then((response) => response.stringify())
    .then(response => {
        if(response.keys(obj).length == 0)
            isUsernameAcceptable = true;
        else 
            isUsernameAcceptable = false;
    }).catch((error) => {
        console.log(error)
    })
}

async function checkEmail(){
    let email = ""/*document.getElementById("email").value*/;
    let customHeaders = {
        "Content-type" : "application/json; charset=UTF-8"
    }
    //verificacion de si es un correo
    //^: inicio del string
    //\w: cualquier letra [Aa-Zz], numero [0-9] o guion bajo [_]
    //+: uno o mas de lo anterior
    //*: 0 o muchos de lo anterior
    //?: 0 o uno de lo anterior
    //[]: cualquier caracter que se encuentre dentro de los
    //\.: el caracter "."
    //{a,b}: minimo a, maximo b de lo anterior, siendo a y b enteros y a < b
    //$: final del string
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        isEmailAcceptable = false;
        return;//no es un email
    } 
    
    //verificacion de si el usuario esta repetido
    fetch(emailURL, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(email),
    })
    .then((response) => response.stringify())
    .then(response => {
        if(response.keys(obj).length == 0)
            isEmailAcceptable = true;
        else 
            isEmailAcceptable = false;
    }).catch((error) => {
        console.log(error)
    })
    
}

//revisar si la contraseña cumple con los requisitos
function checkPassword(){
    let password = ""/*document.getElementById("password").value*/;
    //contraseña muy larga o corta
    if (password.length < 8 || password.length > 50)
        return false;

    //se revisa si tiene caracteres especiales
    caracteresEspeciales = ['!','.','\\','/','-','_','<','>','=','@','#','$','%','^','&','*','(',')','+','?','"',"'",'{','}','[',']','~',';',':'];

    //se revisa si tiene mayusculas
    caracteresMayusculas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    //se revisa si tiene minusculas
    caracteresMinusculas = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];//creo

    let charMin = false;
    let charMay = false;
    let charEsp = false;
    let j = -1;
    for (let i = 0; i < password.length; i++) {
        while (!charMin && ++j < caracteresMinusculas.length) {
            if(caracteresMinusculas[j] == password[i]){
                charMin = true;
                break;
            }
        }
        j = -1;

        while (!charMay && ++j < caracteresMayusculas.length) {
            if(caracteresMayusculas[j] == password[i]){
                charMay = true;
                break;
            }
        }
        j = -1;
        
        while (!charEsp && ++j < caracteresEspeciales.length) {
            if(caracteresEspeciales[j] == password[i]){
                charEsp = true;
                break;
            }
        }
        j = -1;

        if(charMin && charMay && charEsp)
            return true;
    }

    return false;
}