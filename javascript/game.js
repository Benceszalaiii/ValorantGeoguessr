var x = 0;
var y = 0;
var loc;
var map;

const MAX_POINT = 5000;
const MAX_DISTANCE = 200 - 8;

function guess() {
    if ($("#guess-btn").attr("disabled"))
        return;

    console.log(loc.distance([x, y]));
    point();
    next_location();
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

function next_location() {
    loc = locations[map.toLowerCase()]["easy"][Math.floor(Math.random() * locations[map.toLowerCase()]["easy"].length)];
    
    $("#image").attr("src", loc.map);
    $("body").css("background-image", loc.map);

    $("#marker").css("right", "-20px");
    $("#guess-btn").attr("disabled", true);
    $("#guess-btn").text("Place a ping on the map");
}

$("#map").click(function(e) {
    var offset = $(this).offset();
    x = e.pageX - offset.left;
    y = e.pageY - offset.top;

    $("#marker").css("right", `${$(window).width() - (offset.left + $(this).outerWidth()) + (500 - x) - 2.5}px`);
    $("#marker").css("bottom", `${$(window).height() - (offset.top + $(this).outerHeight()) + (500 - y) - 2.5}px`);

    $("#coords").text(`x: ${x}, y: ${y}`);

    $("#guess-btn").attr("disabled", false);
    $("#guess-btn").text("GUESS");
});

$("#guess-btn").on("click", () => {guess()});
document.addEventListener("keydown", e => {
    if (e.code == "Space")
        guess();
});

function main() {
    map = sessionStorage.getItem("map");
        
    if (map == "Random")
        return;

    $("#map").attr("src", `/sources/minimaps/${map.toLocaleLowerCase()}.png`); 

    next_location();
}

main();