const fs = require('fs');
var usrFileName = "./users.json";

var users = {};
var fileLocked = false;

function loadUsers() {
    fs.readFile(usrFileName, (err, data) => {
        if (err) throw err;
        users = JSON.parse(data);
    });
}

function saveUsers() {
    if (!fileLocked) {
        fileLocked = true;
        var json = JSON.stringify(users);
        fs.writeFile(usrFileName, json, 'utf8', function (err) {
            if (err) throw err;
            fileLocked = false;
        })
    }
}

function registerUser(msg) {
    var uid = msg.chat.id;
    var usr = {};
    users[uid] = usr;
    saveUsers();
}

function unregisterUser(msg) {
    var uid = msg.chat.id;
    delete users[uid];
    saveUsers();
}

function getUserList() {
    return Object.keys(users);
}

module.exports = {
    loadUsers: loadUsers,
    registerUser: registerUser,
    unregisterUser: unregisterUser,
    getUserList: getUserList
}