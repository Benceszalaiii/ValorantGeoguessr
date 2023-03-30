var xhr = new XMLHttpRequest();

$("#grid>button").on("click", function() {
    var map = $(this).html();
    console.log(map)

    sessionStorage.setItem("map", map);
    window.location.href = "game.html";
});

function main() {
    var user = getCookie("username");
    console.log(user)

    if (user == "") {
        $("#grid").css("visibility","hidden")
        $("#user-input").css("display", "flex");
        $("input#submit").on("click", function() {
            var input = $("input#name").val();
            if (input == "" || input == null)
                return;
        
            user = input;
            setCookie("username", user, 10);
            $("#grid").css("visibility","visible")
            $("#user-input").css("display", "none");
        });
        $("#guest").on("click", function(){
            $("#grid").css("visibility","visible")
            $("#user-input").css("display", "none");
        })
    }

    sessionStorage.setItem("username", user);
}

main();
