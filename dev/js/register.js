const registerURL = "";

const usernameURL = "";
const emailURL = "";

var isPasswordAcceptable = false;
var isEmailAcceptable = false;
var isUsernameAcceptable = false;

//para funcionamiento correcto hacer llamados en funcion de eventos pero con intervalos fijos de tiempo entre peticiones

async function register(){
    if(isPasswordAcceptable && isEmailAcceptable && isUsernameAcceptable){
        fetch(url)
    }
    //no se puede registrar todavia
}

//devuelve los datos de todos los usuarios de la base de datos
async function usersData(url = 'https://jsonplaceholder.typicode.com/users', data = {}){
    let response = await fetch(url);
    let users = await response.json();
    return users;
}

function getInfo(){
    var username = "Delphine"/*document.getElementById("username").value*/;
    var email = "Delphine@pain.com"/*document.getElementById("email").value*/;
    var password = "D3lph1n3"/*document.getElementById("password").value*/;
    return {username, password};
}

//revisar si el usuario cumple con los requisitos y no esta repetido
async function checkUsername(){
    let username = "";
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

async function checkEmail(email = "", users){
    let email = "";
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
function checkPassword(password = ""){
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