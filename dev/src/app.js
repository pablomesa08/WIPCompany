
let userID='646ce3eb7457a5f1578ebc2d';
let postURL='http://localhost:3002/comments/upload';
function post_Comment(){
    customHeaders = {
        "Content-type": "application/json; charset=UTF-8"
    };
    fetch(`${postURL}/${userID}`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify({
            contenido: "Auxilio dulce jesús mío"
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.error){//si existe el campo error no se pudo registrar al usuario
            console.log("no se pudo registrar al usuario");
        } else {
            console.log("registro exitoso");
        }
        //revisar si la respuesta fue buena
    })
    .catch((error) => {
        console.log(error);
        //indicar que no se pudo registrar al usuario
    })
}

post_Comment();

let getPostURL='http://localhost:3002/comments/fetch';

async function get_Comments(){
    
    fetch(`${getPostURL}`, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.error){//si existe el campo error no se pudo registrar al usuario
            console.log("no se pudo registrar al usuario");
        } else {
            return data;
        }
        //revisar si la respuesta fue buena
    })
    .catch((error) => {
        console.log(error);
        //indicar que no se pudo registrar al usuario
    })
}

get_Comments();

/*let username 

let socket = io()
do {
    username = prompt('Enter your name: ')
} while(!username)
*/

let username = "PON ACA LA VARIABLE GLOBAL DEL USERNAME";
const textarea = document.querySelector('#textarea')
const submitBtn = document.querySelector('#submitBtn')
const commentBox = document.querySelector('.comment__box')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let comment = textarea.value
    if(!comment) {
        return
    }
    postComment(comment)
})

function postComment(comment) {
    // Append to dom
    let data = {
        username: username,
        comment: comment
    }
    appendToDom(data)
    textarea.value = ''
    // Broadcast
    broadcastComment(data)
    // Sync with Mongo Db
    syncWithDb(data)

}

function appendToDom(data) {
    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    let markup = `
                        <div class="card border-light mb-3">
                            <div class="card-body">
                                <h6>${data.username}</h6>
                                <p>${data.comment}</p>
                                <div>
                                    <img src="/img/clock.png" alt="clock">
                                    <small>${moment(data.time).format('LT')}</small>
                                </div>
                            </div>
                        </div>
    `
    lTag.innerHTML = markup

    commentBox.prepend(lTag)
}

function broadcastComment(data) {
    // Socket
    socket.emit('comment', data)
}

socket.on('comment', (data) => {
    appendToDom(data)
})
let timerId = null
function debounce(func, timer) {
    if(timerId) {
        clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
        func()
    }, timer)
}
let typingDiv = document.querySelector('.typing')
socket.on('typing', (data) => {
    typingDiv.innerText = `${data.username} is typing...`
    debounce(function() {
        typingDiv.innerText = ''
    }, 1000)
})

// Event listner on textarea
textarea.addEventListener('keyup', (e) => {
    socket.emit('typing', { username })
})

// Api calls 

function syncWithDb(data) {
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch('/api/comments', { method: 'Post', body:  JSON.stringify(data), headers})
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
}

function fetchComments () {
    fetch('/api/comments')
        .then(res => res.json())
        .then(result => {
            result.forEach((comment) => {
                comment.time = comment.createdAt
                appendToDom(comment)
            })
        })
}

window.onload = fetchComments
