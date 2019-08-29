//resetDatabase();
let listPlayer = getPlayers();
document.getElementById("tablePlayer").innerHTML = loadTablePlayer();

function loadTablePlayer() {
    let playerTable;
    if (listPlayer.length > 0) {
        playerTable = "<table style='border: solid 1px black'>";
        playerTable += "<tr>" +
            "<td>ID</td>" +
            "<td>Tên Cầu Thủ</td>" +
            "<td>Quốc Gia</td>" +
            "<td>Tuổi</td>" +
            "<td>ORV</td>" +
            "<td>Vị Trí</td>" +
            "<td>Chỉnh Sửa</td>" +
            "</tr>";
        for (let i = 0; i < listPlayer.length; i++) {
            playerTable += "<tr>" +
                "<td>" + listPlayer[i].playerId + "</td>" +
                "<td><input id='name" + listPlayer[i].playerId + "' value='" + listPlayer[i].playerName + "' disabled/></td>" +
                "<td><input id='national" + listPlayer[i].playerId + "' value='" + listPlayer[i].national + "' disabled/></td>" +
                "<td><input id='age" + listPlayer[i].playerId + "' value='" + listPlayer[i].age + "' disabled/></td>" +
                "<td><input id='ovr" + listPlayer[i].playerId + "' value='" + listPlayer[i].ovr + "' disabled/></td>" +
                "<td><input id='position" + listPlayer[i].playerId + "' value='" + listPlayer[i].position + "' disabled/></td>" +
                "<td>" +
                "<button id='btnOk1" + listPlayer[i].playerId + "' onclick='editPlayer(" + listPlayer[i].playerId + ")' hidden>OK</button>" +
                "<button onclick='removePlayer(" + listPlayer[i].playerId + ")'><i class='fa fa-trash' style='size: A3'></i></button>" +
                "<button onclick='openEditPlayer(" + listPlayer[i].playerId + ")'>Edit</button>" +
                "</td>" +
                "</tr>";
        }
        playerTable += "</table>";
        document.getElementById("tablePlayer").innerHTML = playerTable;
        return playerTable;
    } else {
        document.getElementById("tablePlayer").innerHTML = "empty";
        return 'empty';
    }
}


function addPlayer() {
    let playerId = generateId1();
    let playerName = document.getElementById('playerName').value;
    let age = document.getElementById('age').value;
    let playerNational = document.getElementById('national').value;
    let ovr = document.getElementById('ovr').value;
    let position = document.getElementById('position').value;
    if (playerName == '' || age == '' || playerNational == '' || ovr == '' || position == '') {
        alert("Phải Nhập Đủ Thông Tin");
        return;
    }

    listPlayer.push(new Player(playerId, playerName, age, playerNational, ovr, position));
    updateDatabase(listPlayer);
    loadTablePlayer();
}


function removePlayer(id) {
    for (let i = 0; i < listPlayer.length; i++) {
        if (id === listPlayer[i].playerId) {
            listPlayer.splice(i, 1);
            break;
        }
    }
    loadTablePlayer();
    updateDatabase(listPlayer);
}

function editPlayer(id) {
    let newPlayerName = document.getElementById("name" + id).value;
    let newAge = document.getElementById("national" + id).value;
    let newPlayerNational = document.getElementById("age" + id).value;
    let newOvr = document.getElementById("ovr" + id).value;
    let newPosition = document.getElementById("position" + id).value;
    for (let i = 0; i < listPlayer.length; i++) {
        if (id === listPlayer[i].playerId) {
            listPlayer[i].setPlayerName(newPlayerName);
            listPlayer[i].setAge(newAge);
            listPlayer[i].setNational(newPlayerNational);
            listPlayer[i].setOvr(newOvr);
            listPlayer[i].setPosition(newPosition);
            break;
        }
    }
    updateDatabase(listPlayer);
    loadTablePlayer();
    document.getElementById("name" + id).disabled = true;
    document.getElementById("national" + id).disabled = true;
    document.getElementById("age" + id).disabled = true;
    document.getElementById("ovr" + id).disabled = true;
    document.getElementById("position" + id).disabled = true;
    document.getElementById("btnOk1" + id).hidden = true;
}

function openEditPlayer(id) {
    document.getElementById("name" + id).disabled = false;
    document.getElementById("national" + id).disabled = false;
    document.getElementById("age" + id).disabled = false;
    document.getElementById("ovr" + id).disabled = false;
    document.getElementById("position" + id).disabled = false;
    document.getElementById("btnOk1" + id).hidden = false;
}
function getPlayersDatabase() {
    let playersData = "";
    if (localStorage.getItem("Players")) {
        playersData = localStorage.getItem("Players");
        playersData = JSON.parse(playersData);
        return playersData;
    } else {
        localStorage.setItem("Players", "");
        return [];
    }
}

function getPlayers() {
    let playersDatabase = getPlayersDatabase();
    let tempPlayer;
    let players = [];
    for (let player of playersDatabase) {
        tempPlayer = new Player();
        tempPlayer.setPlayerId(player.playerId);
        tempPlayer.setPlayerName(player.playerName);
        tempPlayer.setAge(player.age);
        tempPlayer.setNational(player.national);
        tempPlayer.setOvr(player.ovr);
        tempPlayer.setPosition(player.position);
        players.push(tempPlayer);
    }
    return players;
}

function updateDatabase(players) {
    localStorage.setItem("Players", JSON.stringify(players));
}


function generateId1() {
    if (localStorage.getItem("generateId1")) {
        let id = parseInt(localStorage.getItem("generateId1"));
        id++;
        localStorage.setItem("generateId1", id.toString());
        return id;
    } else {
        localStorage.setItem("generateId1", "1");
        return 1;
    }
}

function resetDatabase() {
    localStorage.setItem("Players","");
    localStorage.setItem("generateId1","0");
}