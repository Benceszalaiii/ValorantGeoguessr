var xhr = new XMLHttpRequest();

$("button").on("click", function() {
    var map = $(this).html();
    console.log(map)

    sessionStorage.setItem("map", map);
    window.location.href = "game.html";
});

function main() {
    var user = getCookie("username");

    if (user == "") {
        $("#user-input").css("display", "flex");
        $("input#submit").on("click", function() {
            var input = $("input#name").val();
            if (input == "" || input == null)
                return;

            user = input;
            setCookie("username", user, 10);

            $("#user-input").css("display", "none");
        });
    }

    sessionStorage.setItem("user", user);
}

main();