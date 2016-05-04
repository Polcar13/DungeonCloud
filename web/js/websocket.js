window.onload = init;
var socket = new WebSocket("http://192.168.43.103:8080/WebsocketHome/actions");
socket.onmessage = onMessage;
socket.onopen = onOpen;

function onOpen(event) {
    console.log("Connexió establerta: " + socket);
}

function onMessage(event) {
    var message = JSON.parse(event.data);

    switch (message.action) {
        case "addUser":
            printUserElement(message);
            break;
        case "remove":
            document.getElementById(message.id).remove();
            break;
        case "toggle":
            var node = document.getElementById(message.id);
            var statusText = node.children[2];
            if (message.status === "On") {
                statusText.innerHTML = "Status: " + message.status + " (<a href=\"#\" OnClick=toggleUser(" + message.id + ")>Turn off</a>)";
            } else if (message.status === "Off") {
                statusText.innerHTML = "Status: " + message.status + " (<a href=\"#\" OnClick=toggleUser(" + message.id + ")>Turn on</a>)";
            }
            break;
    }
}

function addUser(name, status) {
    var Action = {
        action: "addUser",
        name: name,
        status: status
    };
    socket.send(JSON.stringify(Action));
}

function removeUser(element) {
    var id = element;
    var Action = {
        action: "remove",
        id: id
    };
    socket.send(JSON.stringify(Action));
}

function toggleUser(element) {
    var id = element;
    var Action = {
        action: "toggle",
        id: id
    };
    socket.send(JSON.stringify(Action));
}

function printUserElement(user) {
    var content = document.getElementById("content");

    var userDiv = document.createElement("div");
    userDiv.setAttribute("id", user.id);
    userDiv.setAttribute("class", "user " + user.status);
    content.appendChild(userDiv);

    var userName = document.createElement("span");
    userName.setAttribute("class", "userName");
    userName.innerHTML = user.name;
    userDiv.appendChild(userName);

    var userStatus = document.createElement("span");
    if (user.status === "On") {
        userStatus.innerHTML =
                '<div class="list-group lg-alt">' +
                '<a class="list-group-item media" href="">' +
                '<div class="pull-left">' +
                '<img src="img/bag-on-head.png" alt="" class="img-avatar">' +
                '</div>' +
                '<div class="media-body">' +
                '<small class="list-group-item-heading">Davil Parnell</small>' +
                '<small class="list-group-item-text c-gray"><i class="fa fa-circle text-success"></i>Online</small>' +
                '</div>' +
                '</a>' +
                '</div>';
    } else if (user.status === "Off") {
        userStatus.innerHTML =
                '<div class="list-group lg-alt">' +
                '<a class="list-group-item media" href="">' +
                '<div class="pull-left">' +
                '<img src="img/bag-on-head.png" alt="" class="img-avatar">' +
                '</div>' +
                '<div class="media-body">' +
                '<small class="list-group-item-heading">Davil Parnell</small>' +
                '<small class="list-group-item-text c-gray"><i class="fa fa-circle text-danger"></i>Offline</small>' +
                '</div>' +
                '</a>' +
                '</div>';
    }
    userDiv.appendChild(userStatus);

    var removeUser = document.createElement("span");
    removeUser.setAttribute("class", "removeUser");
    removeUser.innerHTML = "<a href=\"#\" OnClick=removeUser(" + user.id + ")>Remove user</a>";
    userDiv.appendChild(removeUser);
}

function showForm() {
    document.getElementById("addUserForm").style.display = '';
}

function hideForm() {
    document.getElementById("addUserForm").style.display = "none";
}

function formSubmit() {
    var form = document.getElementById("addUserForm");
    var name = form.elements["userName"].value;
    var status = form.elements["userStatus"].value;
    hideForm();
    document.getElementById("addUserForm").reset();
    addUser(name, status);
}

function init() {
    hideForm();
}