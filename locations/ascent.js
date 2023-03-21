const locations = {
    "easy": [
        [219, 343], [272, 356], [208, 73],
        [126, 48], [153, 382], [418, 306],
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
    for (let e = 0; e < locations["easy"].length; e++) {
        ASCENT["easy"].push(new Location(`/sources/Ascent/Easy/kep${e+1}.png`, locations["easy"][e]))
    }
    for (let m = 0; m < locations["medium"].length; m++) {
        ASCENT["medium"].push(new Location(`/sources/Ascent/Medium/kep${m+1}`, locations["medium"][m]))
    }
    for (let h = 0; h < locations["hard"].length; h++) {
        ASCENT["hard"].push(new Location(`/sources/Ascent/Hard/kep${m+1}`, locations["hard"][h]))
    }
    for (let i = 0; i < locations["impossible"].length; i++) {
        ASCENT["impossible"].push(new Location(`/sources/Ascent/Impossible/kep${m+1}`, locations["impossible"][i]))
    }
}

define()