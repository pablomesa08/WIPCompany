function getInfo(){
    var username = "Cecilio"/*document.getElementById("username").value*/;
    var password = "Cecilio1"/*document.getElementById("password").value*/;
    return {username, password};
}

async function loginData(url = "http://localhost:3002/user/", data = {}){
    data = getInfo();

    url += `${data.username}/${data.password}`
    
    fetch(url, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        const token = res;
        return token;
    })
    .catch((error) => {
        //indicar que no se pudo hacer el login
        console.log(error);
        return -1;
    });
}


loginData();
