const fs = require("fs");

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

        for (let i = 0; i < this.shows.length; i++) {
            const element = this.shows[i];
            if (data.name == element.name) {
                console.log("already created");
                return
            }
        }

        var show = {}
        show.name = data.name;
        this.shows.push(show);

        this.data[0] = this.shows;

        console.log(this.data)
        this.saveData();
    }

    getShowNames(str = "") {
        str = str.toLowerCase();
        var temp = [];
        console.log(this.shows)
        console.log(this.data)
        for (let i = 0; i < this.shows.length; i++) {
            const element = this.shows[i];

            var title = element.name.toLowerCase();
            if (str.length == 0 || title.indexOf(str) == 0) {
                temp.push(element);
            }
        }
        // console.log(temp);
        return JSON.stringify(temp);
    }

    saveData() {
        var json = JSON.stringify(this.data);
        fs.writeFileSync('data.json', json, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }

    readData() {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (data != "") {
                this.data = JSON.parse(data);
                this.shows = this.data[0];
                this.tickets = this.data[1];
            }
        });
    }

}