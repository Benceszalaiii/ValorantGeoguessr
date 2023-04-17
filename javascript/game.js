var x = 2000;
var y = 2000;
var loc;
var map;
var difficulty;
var user;
var time;
var current_timer;
var total_time = 0;
var timer;
var random_maps = [];
let random_svgs = {};
var is_random = false;
var showing_score = false;
var showing_results = false;

const MAX_POINT = 5000;
const MAX_DISTANCE = 200 - 8;
const MAX_ROUND = 5;

var rounds_played = 0;
var locs_selected = [];
var answers = [];
var points = 0;
var current_points = 0;

function guess() {
    clearInterval(timer);
    if ($("#guess-btn").attr("disabled")) return;

    rounds_played++;

    answers.push([x, y]);
    point();

    show_score();
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

    total_time += time - current_timer;
    points += current_points;
}

function show_score() {
    showing_score = true;

    $("#max").text("of " + MAX_POINT * rounds_played);
    $("#earned").text(points);

    $("#c-max").text("of " + MAX_POINT);
    $("#c-earned").text(current_points);

    $("#game").css("display", "none");
    $("#score").css("display", "flex");

    if (is_random)
        $("#solution-map").attr("src", `/sources/minimaps/${random_maps[rounds_played - 1]}.png`);
    else
        $("#solution-map").attr("src", `/sources/minimaps/${map.toLocaleLowerCase()}.png`);

    var offset = $("#solution-map").offset();
    $("#connection").css("left", offset.left).css("top", offset.top);

    if (x != 2000) {
        $("#connection>g>path").attr("d", `M${x} ${y} l${loc.x - x} ${loc.y - y}`);

        $("#answer").css("right", `${$(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - x) - 10}px`);
        $("#answer").css("bottom", `${$(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - y) - 10}px`);

        $("#solution").css("right", `${$(window).width() - (offset.left + $("#solution-map").outerWidth()) + (500 - loc.x) - 10}px`);
        $("#solution").css("bottom", `${$(window).height() - (offset.top + $("#solution-map").outerHeight()) + (500 - loc.y) - 10}px`);
    } else {
        $("#connection>g>path").attr("d", ``);
        $("#answer").css("right", `-20px`).css("bottom", `-20px`);
        $("#solution").css("right", `-20px`).css("bottom", `-20px`);
    }

    $("#image").attr("src", "");
    $("#rounds").text(`Round ${rounds_played}/5`);

    $("#nav>#buttons>button:first-child").on("click", () => {
        if ($("#score").css("display") != "none") {
            showing_score = false;
            next_location();
        }
    });

    $("#nav>#buttons>button:last-child").on("click", () => {
        showing_score = false;
        location = "index.html";
    });
}

function change_map() {
    var sel_map = $("#maps_select > input[type='radio']:checked").attr("value");
    var map_shown = `<img class='random-result' id='random-${sel_map}' src='/sources/minimaps/${sel_map}.png'>`
    $("#show-result").html(map_shown);
    var offset = $("#show-result > img").offset();
    var sel_svg = `<svg width="500" height="500" style='left: ${offset.left}px; top: ${offset.top}px' id="res-connection"><g fill="none" stroke="blue" stroke-width="2">${random_svgs[sel_map]}</g></svg>`;
    var locs = "";

    for (let i = 0; i < locs_selected.length; i++) {
        if (answers[i][0] == 2000)
                continue;
                
        let curr_map = random_maps[i]
        if (curr_map != sel_map)
            continue;

        let curr_location = locs_selected[i]

        locs += `<div class='solution' style='right: ${$(window).width() - (offset.left + $(`#random-${sel_map}`).outerWidth()) + (500 - curr_location.x) - 10}px;bottom: ${$(window).height() - (offset.top + $(`#random-${sel_map}`).outerHeight()) + (500 - curr_location.y) - 10}px;'><i class="fa-solid fa-font-awesome"></i></div>`;
        locs += `<div class='answer' style='right: ${$(window).width() - (offset.left + $(`#random-${sel_map}`).outerWidth()) + (500 - answers[i][0]) - 12.5}px;bottom: ${$(window).height() - (offset.top + $(`#random-${sel_map}`).outerHeight()) + (500 - answers[i][1]) - 12.5}px;'>${i + 1}</div>`;   
    }
    $("#show-result").html(sel_svg + locs + map_shown);
}

function show_results(resize) {
    showing_results = true;

    $("#total-earned").text(points);

    $("#game").css("display", "none");
    $("#score").css("display", "none");
    $("#result").css("display", "flex");

    if (!is_random) {
        var offset = $("#result-map").offset();

        locs = `<img id='result-map' src='/sources/minimaps/${map.toLocaleLowerCase()}.png'>`;
        connections = "";
        for (var i = 0; i < MAX_ROUND; i++) {
            if (answers[i][0] == 2000)
                continue;

            locs = locs + `<div class='solution' style='right: ${$(window).width() - (offset.left + $("#result-map").outerWidth()) + (500 - locs_selected[i].x) - 10}px;bottom: ${$(window).height() - (offset.top + $("#result-map").outerHeight()) + (500 - locs_selected[i].y) - 10}px;'><i class="fa-solid fa-font-awesome"></i></div>`;
            locs = locs + `<div class='answer' style='right: ${$(window).width() - (offset.left + $("#result-map").outerWidth()) + (500 - answers[i][0]) - 12.5}px;bottom: ${$(window).height() - (offset.top + $("#result-map").outerHeight()) + (500 - answers[i][1]) - 12.5}px;'>${i + 1}</div>`;

            connections =
                connections +
                `<path stroke-dasharray="4,4" d="M${answers[i][0]} ${answers[i][1]} l${locs_selected[i].x - answers[i][0]
                } ${locs_selected[i].y - answers[i][1]}" />`;
        }

        connections =
            `<svg width="500" height="500" style='left: ${offset.left}px; top: ${offset.top}px' id="res-connection"><g fill="none" stroke="blue" stroke-width="2">` +
            connections +
            "</g></svg>";

        $("#show-result").html(connections + locs);
        $("#image").attr("src", "");
    } else {
        $("#show-result").addClass("random-results-container");

        let locs = ""

        for (var i = 0; i < MAX_ROUND; i++) {
            if (answers[i][0] == 2000)
                continue;
            
            var curr_map = random_maps[i];
            if (!random_svgs[curr_map])
            random_svgs[curr_map] = "";

            random_svgs[curr_map] += `<path stroke-dasharray="4,4" d="M${answers[i][0]} ${answers[i][1]} l${locs_selected[i].x - answers[i][0]} ${locs_selected[i].y - answers[i][1]}" />`;
        }

        $("#maps_select").html("")
        for (const map_select of [...new Set(random_maps)]) {
            $("#maps_select").html($("#maps_select").html() + `<input type="radio" name="maps" value="${map_select}">`);
        }
        $("input[type='radio'][name='maps']").change(() => {change_map()});

        $(`input[value="${[...new Set(random_maps)][0]}"]`).attr("checked", true);
        $("#maps_select").css("display", "flex");

        change_map();
    }

    $("#retry-btn").on("click", function () {
        showing_results = false;
        location = "game.html";
    })
    $("#exit-btn").on("click", function () {
        showing_results = false;
        location = "index.html";
    })

    if (user != "" && !resize) {
        get(function (response, args) {
            var exists = response.find(value => value.name == user && value.map == map && value.difficulty == difficulty);
            if (exists) {
                if (exists.point <= points) {
                    del(response.indexOf(exists) + 1, (response, args) => {}, {});
                    add(user, Math.floor(points), total_time, map, difficulty, () => { }, {});
                }
            } else
                add(user, Math.floor(points), total_time, map, difficulty, () => { }, {});
        })
    }
}

$(window).resize(function () {
    if (showing_results) {
        show_results(true)
    } else if (showing_score) {
        show_score()
    }
})

function next_location() {
    $("#score").css("display", "none");
    $("#result").css("display", "none");
    $("#game").css("display", "block");

    if (rounds_played == 5) {
        show_results(false);
        return;
    }

    if (is_random) {
        $("#map").attr("src", `/sources/minimaps/${random_maps[rounds_played]}.png`);
    }

    x = 2000;
    y = 2000;

    if (rounds_played == MAX_ROUND) {
        location = "index.html";
    }

    loc = locs_selected[rounds_played];

    current_timer = time;
    $("#timer").text(`${Math.floor(current_timer / 60)}:${current_timer % 60 >= 10 ? current_timer % 60 : 0 + (current_timer % 60).toString()}`)
    timer = setInterval(function () {
        current_timer -= 1;
        $("#timer").text(`${Math.floor(current_timer / 60)}:${current_timer % 60 >= 10 ? current_timer % 60 : 0 + (current_timer % 60).toString()}`)

        if (current_timer == 0) {
            $("#guess-btn").attr("disabled", false)
            guess()
        }
    }, 1000)

    $("#image").attr("src", loc.map);
    $("body").css("background-image", `url(${loc.map})`);

    $("#marker").css("right", "-20px");
    $("#guess-btn").attr("disabled", true);
    $("#guess-btn").text("Place a ping on the map");
}

$("#map").click(function (e) {
    var offset = $(this).offset();
    x = e.pageX - offset.left;
    y = e.pageY - offset.top;

    $("#marker").css(
        "right",
        `${$(window).width() - (offset.left + $(this).outerWidth()) + (500 - x) - 2.5
        }px`
    );
    $("#marker").css(
        "bottom",
        `${$(window).height() -
        (offset.top + $(this).outerHeight()) +
        (500 - y) -
        2.5
        }px`
    );

    $("#coords").text(`x: ${x}, y: ${y}`);

    $("#guess-btn").attr("disabled", false);
    $("#guess-btn").text("GUESS");
});

$("#guess-btn").on("click", () => {
    guess();
});
document.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        if ($("#result").css("display") != "none")
            return

        if ($("#score").css("display") != "none") {
            showing_score = false;
            next_location();
            return;
        }
        guess();
    }
});

function main() {
    map = sessionStorage.getItem("map");
    difficulty = sessionStorage.getItem("difficulty");
    user = sessionStorage.getItem("username");
    time = parseInt(sessionStorage.getItem("time"));
    time *= 10;

    if (map == "Random") {
        is_random = true;

        const available_maps = Object.keys(locations);

        do {
            let curr = available_maps[Math.floor(Math.random() * available_maps.length)]

            if ([...new Set(random_maps)].length < 4 || random_maps.includes(curr)) {
                random_maps.push(curr);
            }
        } while (random_maps.length < 5)

        do {
            var random_map = random_maps[locs_selected.length];

            var current = locations[random_map][difficulty][Math.floor(Math.random() * locations[random_map][difficulty].length)];
            if (!locs_selected.includes(current)) locs_selected.push(current);
        } while (locs_selected.length < 5)

        next_location();
        return;
    }

    if (map == null) {
        alert("WRONG TURN?\nYou haven't selected a map yet!");
        location = "index.html";
        return;
    }
    $("#map").attr("src", `/sources/minimaps/${map.toLocaleLowerCase()}.png`);

    do {
        var current =
            locations[map.toLowerCase()][difficulty][
            Math.floor(Math.random() * locations[map.toLowerCase()][difficulty].length)
            ];
        if (!locs_selected.includes(current)) locs_selected.push(current);
    } while (locs_selected.length < 5);

    next_location();
}
main();