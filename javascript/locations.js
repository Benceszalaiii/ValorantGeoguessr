class Location {
    constructor (map, coords) {
        this.map = map;
        this.coords = coords;
        this.x = coords[0];
        this.y = coords[1];
    }

    distance(click) {
        let x = click[0];
        let y = click[1];

        return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    }
}

function title(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}


const coordinates = {
    "ascent" : {
        "easy": [
            [219, 343], [272, 356], [208, 73],
            [126, 48], [153, 382], [428, 305],
            [245, 156], [210, 121], [178, 155]
        ],
        "medium": [],
        "hard": [],
        "impossible": []
    }
}

const locations = {
    "ascent" : {
        "easy": [],
        "medium": [],
        "hard": [],
        "impossible": []
    }
}

function define() {
    for (const [map, map_difficulties] of Object.entries(coordinates)) {
        console.log(map, map_difficulties)
        for (const [difficulty, coord_list] of Object.entries(map_difficulties)) {
            console.log(difficulty, coord_list)
            for (const coords of coord_list) {
                locations[map][difficulty].push(new Location(`/sources/${title(map)}/${title(difficulty)}/kep${coordinates[map][difficulty].indexOf(coords) + 1}.png`, coords))
            }
        }
    }

    console.log(locations)
}

define()