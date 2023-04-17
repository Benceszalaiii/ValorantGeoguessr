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
            [245, 156], [210, 121], [178, 155],[309,385],[196,362],[261,248]
        ],
        "medium": [[213, 239],[275, 218],[230,137],[128,78],[122,135],[133,171],[108,333],[111,406],[177,375],[173,414],[35,196]

        ],
        "hard": [[296, 143], [240, 298], [152, 448],[254, 197],[105, 265],[317,240],[297,237],[408,339],[356,310]]
    },
    "bind": {
        "easy": [
            [379, 317], [385, 118], [100, 180], [266, 301], [103, 94],
            [409, 203], [202, 207], [148, 184], [322, 168]
        ],
        "medium": [
            [218, 207], [122, 306], [154, 145], [432, 321],
            [373, 96], [327, 362], [109, 197], [206, 274]
        ],
        "hard": [
            [190, 294], [263, 110], [145, 142], [430, 284], 
            [109, 186],[397, 142], [306, 471], [249, 326], 
            [328, 269], [248, 9], [394, 190]
        ]
    },
    "breeze" : {
        "easy" :[
            [227, 161], [81, 154], [122, 280], [313, 413], [437, 227], [336, 234], [420, 332], [221, 253]
        ],
        "medium" : [
            [253, 467], [319, 16], [333, 178], [191, 350], [78, 311], [225, 131], [341, 91], [208, 214], [85, 296], [275, 273], [354, 216]
        ],
        "hard": [
            [281, 314], [287, 357], [33, 107], [221, 72], [184, 128]
        ]
    }
}

const locations = {
    "ascent" : {
        "easy": [],
        "medium": [],
        "hard": [],
    },
    "bind": {
        "easy": [],
        "medium": [],
        "hard": []
    },
    "breeze": {
        "easy": [],
        "medium": [],
        "hard": []
    }
}

function define() {
    for (const [map, map_difficulties] of Object.entries(coordinates)) {
        for (const [difficulty, coord_list] of Object.entries(map_difficulties)) {
            for (const coords of coord_list) {
                locations[map][difficulty].push(new Location(`/sources/${title(map)}/${title(difficulty)}/kep${coordinates[map][difficulty].indexOf(coords) + 1}.png`, coords))
            }
        }
    }
}

define()