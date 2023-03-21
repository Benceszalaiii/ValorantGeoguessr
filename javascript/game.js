var x = 0;
var y = 0;
var loc;

const MAX_POINT = 5000;
const MAX_DISTANCE = 200 - 8;

function guess() {
    if ($("#guess-btn").attr("disabled"))
        return;

    console.log(loc.distance([x, y]));
    point();
}

function point() {
    distance = loc.distance([x, y]);
    var point = 0;

    if (distance < 8) {
        point = MAX_POINT;
    } else {
        dist = Math.floor((MAX_POINT / MAX_DISTANCE) * distance);
        dist = dist >= MAX_POINT ? MAX_POINT : dist;

        point = 5000 - dist;
    }

    console.log(point);
}

$("document").ready(function() {
    var map = sessionStorage.getItem("map");
    
    if (map == "Random")
        return;

    $("#map").attr("src", `/sources/minimaps/${map.toLocaleLowerCase()}.png`);

    if (map.toLowerCase() == "ascent") {
        console.log(map.toLowerCase())

        loc = ASCENT["easy"][Math.floor(Math.random() * ASCENT["easy"].length)]
        
        $("#image").attr("src", loc.map)
    }    
});

$("#map").click(function(e) {
    var offset = $(this).offset();
    x = e.pageX - offset.left;
    y = e.pageY - offset.top;

    $("#marker").css("top", `${y + offset.top - 2.5}px`);
    $("#marker").css("left", `${x + offset.left - 2.5}px`);

    $("#coords").text(`x: ${x}, y: ${y}`);

    $("#guess-btn").attr("disabled", false);
    $("#guess-btn").text("GUESS");
});

$("#guess-btn").on("click", () => {guess()});
document.addEventListener("keydown", e => {
    if (e.code == "Space")
        guess();
});