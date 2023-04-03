
$("#maps>img").on("click", function() {
    var map = $(this).attr("id");

    sessionStorage.setItem("map", map);
    window.location.href = "options.html";
});


$("#maps>img").hover(function(){
    var map = $(this).attr("id");
    $("#map-name").text(map);
},
function(){
    $("#map-name").text("​");
});

$("#header > :first-child").on("click", function() {
    $("#menu").removeClass("closed");
    $("#close").css("display", "inline-block");
    $("#cover").css("display", "block");
});

function close_menu() {
    $("#menu").addClass("closed");
    $("#close").css("display", "none");
    $("#cover").css("display", "none");
}

$("#change-name").on("click", () => {
    deleteCookie("username");
    location = "index.html";
});

$("#close").on("click", () => close_menu());
$("#cover").on("click", () => close_menu());

function main() {
    var user = getCookie("username");

    if (user == "") {
        $("#grid").css("visibility","hidden")
        $("#user-input").css("display", "flex");
        $("input#submit-name").on("click", function() {
            var input = $("input#name-input").val();
            if (input == "" || input == null)
                return;
        
            user = input;
            setCookie("username", user, 10);

            sessionStorage.setItem("username", user);
            $("#name").text(user);

            $("#grid").css("visibility","visible")
            $("#user-input").css("display", "none");
        });
        $("#guest").on("click", function(){
            $("#grid").css("visibility","visible");
            $("#user-input").css("display", "none");

            $("#name").text("*Guest*");
        });
    }

    sessionStorage.setItem("username", user);
    $("#name").text(user);
}

main();