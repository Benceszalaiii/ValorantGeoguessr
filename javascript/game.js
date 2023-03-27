var x = 0;
var y = 0;
var loc;
var map;

const MAX_POINT = 5000;
const MAX_DISTANCE = 200 - 8;
const MAX_ROUND = 5;

var rounds_played = 0;
var locs_selected = [];
var answers = [];
var points = 0;
var current_points = 0;

function guess() {
    if ($("#guess-btn").attr("disabled"))
        return;

    rounds_played++;
    console.log(loc.distance([x, y]));
    answers.push([x, y]);
    point();

    console.log(rounds_played)
    if (rounds_played != 5) 
        show_score();
    else
        show_results();
}

function point() {
    distance = loc.distance([x, y]);

    if (distance < 8) {
        current_points = MAX_POINT;
    } else {
        dist = Math.floor((MAX_POINT / MAX_DISTANCE) * distance);
        dist = dist >= MAX_POINT ? MAX_POINT : dist;

        current_points = 5000 - dist;
    }

    points += current_points;

    console.log(current_points, points);
}

function show_score() {
    $("#max").text(MAX_POINT * rounds_played);
    $("#earned").text(points);
    
    $("#c-max").text(MAX_POINT);
    $("#c-earned").text(current_points);
    
    
    $("#game").css("display", "none");
    $("#score").css("display", "flex");
    
    $("#solution-map").attr("src", "/sources/minimaps/ascent.png")
    var offset = $("#solution-map").offset();
    $("#connection>g>path").attr("d", `M${x} ${y} l${loc.x-x} ${loc.y-y}`);
    $("#connection").css("left", offset.left).css("top", offset.top);

    console.log(x, y, $(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - x), $(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - y));
    $("#solution").css("right", `${$(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - x) - 2.5}px`);
    $("#solution").css("bottom", `${$(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - y) - 2.5}px`);

    $("#answer").css("right", `${$(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - loc.x) - 5}px`);
    $("#answer").css("bottom", `${$(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - loc.y) - 5}px`);

    $("#image").attr("src", "");

    $("#nav>button:first-child").on("click", () => {
        if ($("#score").css("display") != "none") {           
            next_location();
        }
    });

    $("#nav>button:last-child").on("click", () => {
        location = "index.html"
    });
}

function show_results() {
    $("#max").text(MAX_POINT * rounds_played);
    $("#earned").text(points);
    
    $("#game").css("display", "none");
    $("#score").css("display", "flex");
    
    var offset = $("#solution-map").offset();

    locs = "<img id='solution-map'>";
    connections = "";
    for (var i = 0; i < MAX_ROUND; i++) {
        locs = locs + `<div class='solution' style='right: ${$(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - answers[i][0]) - 2.5}px;
                                                    bottom: ${$(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - answers[i][0]) - 2.5}px;'></div>`
        locs = locs + `<div class='answer' style='right: ${$(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - locs_selected[i].x) - 5}px;
                                                    bottom: ${$(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - locs_selected[i].y) - 2.5}px;'></div>`
    
        connections = connections + `<path stroke-dasharray="10,10" d="M${answers[i][0]} ${answers[i][0]} l${locs_selected[i].x-answers[i][0]} ${locs_selected[i].y-answers[i][0]}" />`    
    }

    connections = `<svg width="500" height="500" style= id="connection"><g fill="none" stroke="black" stroke-width="4">` + connections + '</g></svg>'

    $("#show-score").html(locs + connections);
    $("#solution-map").attr("src", "/sources/minimaps/ascent.png")

    $("#image").attr("src", "");

    $("#nav>button:first-child").on("click", () => {
        if ($("#score").css("display") != "none") {           
            next_location();
        }
    });

    $("#nav>button:last-child").on("click", () => {
        location = "index.html"
    });
}

function next_location() {
    $("#score").css("display", "none");
    $("#game").css("display", "block");
    
    if (rounds_played == MAX_ROUND) {
        location = "index.html";
    }

    loc = locs_selected[rounds_played];
    
    $("#image").attr("src", loc.map);
    $("body").css("background-image", `url(${loc.map})`);

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
    if (e.code == "Space") {
        if ($("#score").css("display") != "none") {           
            next_location();
            return;
        }
        guess();
    }
});

function main() {
    map = sessionStorage.getItem("map");
        
    if (map == "Random")
        return;

    $("#map").attr("src", `/sources/minimaps/${map.toLocaleLowerCase()}.png`);
    
    // section: TO BE CHANGED WHEN NEW LOCATIONS ARE UPLOADED 

    do {
        var current = locations[map.toLowerCase()]["easy"][Math.floor(Math.random() * locations[map.toLowerCase()]["easy"].length)];

        if (!locs_selected.includes(current))
            locs_selected.push(current);
    } while (locs_selected.length < 5);

    // end_section

    next_location();
}

main();