var xhr = new XMLHttpRequest();

$("button").on("click", function() {
    var map = $(this).html();
    console.log(map)

    sessionStorage.setItem("map", map);
    window.location.href = "game.html";
});