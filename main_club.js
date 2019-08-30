let listClub = getClubs();

function loadTable() {
    let clubTable;
    if (listClub.length > 0) {
        clubTable = "<table style='border: solid 1px black'>";
        clubTable += "<tr>" +
            "<td>ID</td>" +
            "<td>Tên Đội Bóng</td>" +
            "<td>Quốc Gia</td>" +
            "<td>Sân Vận Động</td>"+
            "<td>Chỉnh Sửa</td>" +
            "</tr>";
        for (let i = 0; i < listClub.length; i++) {
            clubTable += "<tr>" +
                "<td>" + listClub[i].clubId + "</td>" +
                "<td><button class='clubbtn' onclick='moveToManagePlayer()' id='nameClub" + listClub[i].clubId + "'>" + listClub[i].clubName + "</button></td>" +
                "<td><input id='nationalClub" + listClub[i].clubId + "' value='" + listClub[i].clubNational + "' disabled/></td>" +
                "<td><input id='stadium" + listClub[i].clubId + "' value='" + listClub[i].stadium + "' disabled/></td>" +
                "<td>" +
                "<button id='btnOk" + listClub[i].clubId + "' onclick='edit(" + listClub[i].clubId + ")' hidden>OK</button>" +
                "<button onclick='remove(" + listClub[i].clubId + ")'><i class='fa fa-trash' style='size: A3'></i></button>" +
                "<button onclick='openEdit(" + listClub[i].clubId + ")'>Edit</button>" +
                "</td>" +
                "</tr>";
        }
        clubTable += "</table>";
        document.getElementById("clubTable").innerHTML = clubTable;
        return clubTable;
    }
    document.getElementById("clubTable").innerHTML = "empty";
    return "empty";
}

document.getElementById("clubTable").innerHTML = loadTable();

function addClub() {
    let clubId = generateId();
    let clubName = document.getElementById("clubName").value;
    let clubNational = document.getElementById("clubNational").value;
    let stadium = document.getElementById("stadium").value;
    if (clubName == '' || clubNational == '' || stadium == '') {
        alert("Phải Nhập Đủ Thông Tin");
        return;
    }
    listClub.push(new FootballClub(clubId, clubName, clubNational, stadium));
    updateDatabase(listClub);
    loadTable();
}

function remove(id) {
    for (let i = 0; i < listClub.length; i++) {
        if (id === listClub[i].clubId) {
            listClub.splice(i, 1);
            break;
        }
    }
    loadTable();
    updateDatabase(listClub);
}

function edit(id) {
    let newName = document.getElementById("nameClub" + id).value;
    let newNational = document.getElementById("nationalClub" + id).value;
    let newStadium = document.getElementById("stadium" + id).value;
    for (let i = 0; i < listClub.length; i++) {
        if (id === listClub[i].clubId) {
            listClub[i].setClubName(newName);
            listClub[i].setClubNational(newNational);
            listClub[i].setStadium(newStadium);
            break;
        }
    }
    updateDatabase(listClub);
    loadTable();
    document.getElementById("nameClub" + id).disabled = true;
    document.getElementById("nationalClub" + id).disabled = true;
    document.getElementById("stadium" + id).disabled = true;
    document.getElementById("btnOk" + id).hidden = true;

}

function openEdit(id) {
    document.getElementById("nameClub" + id).disabled = false;
    document.getElementById("nationalClub" + id).disabled = false;
    document.getElementById("stadium" + id).disabled = false;
    document.getElementById("btnOk" + id).hidden = false;
}


function getClubsDatabase() {
    let clubsData = "";
    if (localStorage.getItem("Clubs")) {
        clubsData = localStorage.getItem("Clubs");
        clubsData = JSON.parse(clubsData);
        return clubsData;
    } else {
        localStorage.setItem("Clubs", "");
        return [];
    }
}

function getClubs() {
    let clubsDatabase = getClubsDatabase();
    let tempClub;
    let clubs = [];
    for (let club of clubsDatabase) {
        tempClub = new FootballClub();
        tempClub.setClubId(club.clubId);
        tempClub.setStadium(club.stadium);
        tempClub.setClubNational(club.clubNational);
        tempClub.setClubName(club.clubName);
        clubs.push(tempClub);
    }
    return clubs;
}

function updateDatabase(clubs) {
    localStorage.setItem("Clubs", JSON.stringify(clubs));
}


function generateId() {
    if (localStorage.getItem("generateId")) {
        let id = parseInt(localStorage.getItem("generateId"));
        id++;
        localStorage.setItem("generateId", id.toString());
        return id;
    } else {
        localStorage.setItem("generateId", "1");
        return 1;
    }
}

function moveToManagePlayer() {
    let r = confirm("Bạn Muốn Chỉnh Sửa Danh Sách Cầu Thủ Của Đội Bóng Không?\nChọn OK hoặc Cancel.");
    if (r) {
        return window.location = "manage_player.html";
    }
}















