export function httpPostAsync(theUrl, data, callback = console.log) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
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