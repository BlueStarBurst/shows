import fs from 'fs';

export default class Data {

    shows = []
    tickets = { 'add': {}, 'adj': {}, 'req': [], 'bug': [] }

    // STANDARD CATEGORIES
    // 0 = cute   1 = action   2 = romance   3 = shoujo   4 = seinen


    constructor() {
        this.readData();
    }

    createShow(data) {

        if (data.name.length == 0) {
            return false;
        }

        for (let i = 0; i < this.shows.length; i++) {
            const element = this.shows[i];
            console.log(data);
            console.log(element);
            if (data.name.toLowerCase() == element.name.toLowerCase()) {
                console.log("already created");
                return false;
            }
        }

        var show = {}
        var articles = ["and ", "the ", "of ", "in ", "as ", "an ", "a "]

        var newTitle = data.name.charAt(0).toUpperCase();

        for (let i = 1; i < data.name.length; i++) {
            if (data.name.charAt(i - 1) == " ") {
                var upper = true;
                articles.forEach(article => {
                    if (article == data.name.substr(i, article.length)) {
                        upper = false;
                    }
                });
                if (upper) {
                    newTitle += data.name.charAt(i).toUpperCase();
                } else {
                    newTitle += data.name.charAt(i);
                }
            } else {
                newTitle += data.name.charAt(i);
            }
        }

        if (this.tickets.add[newTitle]) {
            this.tickets.add[newTitle].count = this.tickets.add[newTitle].count + 1
        } else {
            this.tickets.add[newTitle] = {count: 1, data:[]};
        }

        if (data.data) {
            this.tickets.add[newTitle].data.push(data.data.split(',').map(function(item) {
                return parseInt(item, 10);
            }))
        }


        // this.shows.push(show);

        // this.tickets.add.push(show);

        this.saveTickets();
        return true;
    }

    getShowNames(str = "") {
        str = str.toLowerCase();
        var temp = [];
        console.log(this.shows)
        for (let i = 0; i < this.shows.length; i++) {
            const element = this.shows[i];

            var title = element.name.toLowerCase();
            if (str.length == 0 || title.indexOf(str) != -1) {
                temp.push(element);
            }
        }
        // console.log(temp);
        return JSON.stringify(temp);
    }

    saveShows() {
        var jsonS = JSON.stringify(this.shows);
        fs.writeFileSync('data/shows.json', jsonS, (err) => {
            if (err) throw err;
            console.log('The shows have been saved!');
        });
    }

    saveTickets() {
        var jsonT = JSON.stringify(this.tickets);
        fs.writeFileSync('data/tickets.json', jsonT, (err) => {
            if (err) throw err;
            console.log('The tickets have been saved!');
        });
    }

    readData() {
        fs.readFile('data/shows.json', 'utf8', (err, data) => {
            if (data != "") {
                this.shows = JSON.parse(data);
            }
        });
        fs.readFile('data/tickets.json', 'utf8', (err, data) => {
            if (data != "") {
                this.tickets = JSON.parse(data);
            }
        });
    }

}