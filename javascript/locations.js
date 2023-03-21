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


const locations_ascent = {
    "easy": [
        [219, 343], [272, 356], [208, 73],
        [126, 48], [153, 382], [428, 305],
        [245, 156], [210, 121], [178, 155]
    ],
    "medium": [],
    "hard": [],
    "impossible": []
}

const ASCENT = {
    "easy": [],
    "medium": [],
    "hard": [],
    "impossible": []
}

function define() {
    // Ascent
    for (let e = 0; e < locations_ascent["easy"].length; e++) {
        ASCENT["easy"].push(new Location(`/sources/Ascent/Easy/kep${e+1}.png`, locations_ascent["easy"][e]))
    }
    for (let m = 0; m < locations_ascent["medium"].length; m++) {
        ASCENT["medium"].push(new Location(`/sources/Ascent/Medium/kep${m+1}`, locations_ascent["medium"][m]))
    }
    for (let h = 0; h < locations_ascent["hard"].length; h++) {
        ASCENT["hard"].push(new Location(`/sources/Ascent/Hard/kep${m+1}`, locations_ascent["hard"][h]))
    }
    for (let i = 0; i < locations_ascent["impossible"].length; i++) {
        ASCENT["impossible"].push(new Location(`/sources/Ascent/Impossible/kep${m+1}`, locations_ascent["impossible"][i]))
    }
}

define()