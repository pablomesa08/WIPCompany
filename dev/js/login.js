function getInfo(){
    var username = "Delphine"/*document.getElementById("username").value*/;
    var password = ""/*document.getElementById("password").value*/;
    return {username, password};
}

async function loginData(url = "https://jsonplaceholder.typicode.com/users", data = {}){
    //url
    const url = 'https://httpbin.org/post'
    //informacion del cuerpo de la request
    const data = getInfo();
    const customHeaders = {
        "Content-Type": "application/json",
    }
    fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
    });
    const token = await response;
    return token;
}



