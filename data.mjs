import fs from 'fs';

export default class Data {

    data = [[], []]
    shows = []
    tickets = []

    // STANDARD CATEGORIES
    // 0 = cute   1 = action   2 = romance   3 = shoujo   4 = seinen


    constructor() {

        this.readData();

        this.shows = this.data[0];
        this.tickets = this.data[1];
        console.log(this.data)
    }

    createShow(data) {

        if (data.name.length == 0) {
            return false;
        }

        for (let i = 0; i < this.shows.length; i++) {
            const element = this.shows[i];
            if (data.name.toLowerCase() == element.name.toLowerCase()) {
                console.log("already created");
                return false;
            }
        }

        var show = {}
        var articles = ["and ", "the ", "of ", "in ", "as ", "an ", "a "]

        var newTitle = data.name.charAt(0).toUpperCase();

        for (let i = 1; i < data.name.length; i++) {
            if (data.name.charAt(i-1) == " ") {
                var upper = true;
                articles.forEach(article => {
                    if (article == data.name.substr(i,article.length)) {
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

        show.name = newTitle;
        this.shows.push(show);

        this.data[0] = this.shows;

        console.log(this.data)
        this.saveData();
        return true;
    }

    getShowNames(str = "") {
        str = str.toLowerCase();
        var temp = [];
        console.log(this.shows)
        console.log(this.data)
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

    saveData() {
        var jsonS = JSON.stringify(this.data);
        var jsonT = JSON.stringify(this.data);
        fs.writeFileSync('shows.json', jsonS, (err) => {
            if (err) throw err;
            console.log('The shows has been saved!');
        });
        fs.writeFileSync('tickets.json', jsonT, (err) => {
            if (err) throw err;
            console.log('The tickets has been saved!');
        });
    }

    readData() {
        fs.readFile('shows.json', 'utf8', (err, data) => {
            if (data != "") {
                this.shows = JSON.parse(data);
            }
        });
        fs.readFile('tickets.json', 'utf8', (err, data) => {
            if (data != "") {
                this.tickets = JSON.parse(data);
            }
        });
    }

}