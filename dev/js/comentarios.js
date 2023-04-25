const content_aports = document.getElementById('seccion_aportes');
const endpointComentario = "https://mocki.io/v1/f661fef8-ee06-4168-99f5-37827a1a4842"

function getJson(endpoint) {
  return new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest();
    Http.open("GET", endpoint);
    Http.onload = () => {
      if (Http.status === 200) {
        resolve(JSON.parse(Http.responseText));
      } else {
        reject("Error al obtener los datos");
      }
    };
    Http.onerror = () => {
      reject("Error de red");
    };
    Http.send();
  });
}

async function fetchData() {s
  try {
    const jsonResp = await getJson(endpointComentario);
    console.log(typeof(jsonResp))
    for(x in jsonResp){
      var email = jsonResp[x].email;
      var fecha = jsonResp[x].fecha;
      var username = jsonResp[x].username;
      var comentario = jsonResp[x].comentario;
      content_aports.innerHTML += `<div class="d-flex border mt-3 justify-content-around align-items-center">
    <img class="rounded-circle mx-3" style="max-width: 100px; max-height: 100px" src="https://www.gravatar.com/avatar/${md5(email)}" >
    <div class="d-flex flex-column border mt-3">
    <p class="mx-3  mb-0"> <strong>${username}</strong></p>
    <p class="mx-3" style="font-size:10px;">${fecha}</p>
    <p class="mx-3" style="font-size:15px;">${comentario}</p>
    </div>
    `
    }
  } catch(error) {
    console.log(error);
  }
}
fetchData();

//necesito una funcion POST para enviar el comentario de la persona al backend, para ello en el POST van a haber las cookies y el comentario de la persona
