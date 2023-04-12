function getInfo(){
  var username = "Delphine"/*document.getElementById("username").value*/;
  var password = ""/*document.getElementById("password").value*/;
  return {username, password};
}

async function loginData(url = "https://jsonplaceholder.typicode.com/users", data = {}){
  const response = await fetch(url, {
    method: "GET",
  });
  const token = await response;
  return token;
}

console.log(getInfo().username);
