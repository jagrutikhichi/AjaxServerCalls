//UC-2 To view  Employee data from JSON server
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAjaxCall(methodType, url, callbackFunc, async, data) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // console.log("State changed called . Ready State :"+xhr.readyState+" Status :"+xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callbackFunc(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log(methodType + " method Handle 400 Client Error or 500 server Error")
            }
        }
    }
    xhr.open(methodType, url, async);
    console.log(methodType + " request sent to the server")
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }

}

function getUserDetails(data) {
    console.log("Get response Data " + data);
}
const getUrl = "http://localhost:3000/employee/1";
makeAjaxCall("GET", getUrl, getUserDetails, true)


function userDeleted(data) {
    console.log("User deleted " + data)
}
const deleteUrl = "http://localhost:3000/employee/5";
makeAjaxCall("DELETE", deleteUrl, userDeleted, false)


function userAdded(data) {
    console.log("User Added " + data)
}
const postUrl = "http://localhost:3000/employee";
const empData = { "Name": "Harry Style", "Salary": 400000 };
makeAjaxCall("POST", postUrl, userAdded, true, empData)