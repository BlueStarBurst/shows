export function httpPostAsync(theUrl, data, callback = console.log, error = console.log) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttp.setRequestHeader('Authorization','Basic ' + "stuff");

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        else if (xmlHttp.status != 200) {
            // console.log(xmlHttp.readyState);
            // console.log(xmlHttp.status);
            error(xmlHttp.status)
        }
    }

    xmlHttp.send(data);
}

export function httpGetAsync(theUrl, data, callback = console.log) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.send(data);
}