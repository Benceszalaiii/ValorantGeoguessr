
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
    if ($("#name").text() == "")
        return
    
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
        $("#cover").css("display", "block");
        $("#user-input").css("display", "flex");
        $("input#submit-name").on("click", function() {
            var input = $("input#name-input").val();
            if (input == "" || input == null)
                return;
        
            user = input;
            setCookie("username", user, 10);

            sessionStorage.setItem("username", user);
            $("#name").html(user + `<span class="secret before">${$("#name > .before").text()}</span>`);

            $("#user-input").css("display", "none");
            close_menu();
        });
        $("#guest").on("click", function(){
            $("#user-input").css("display", "none");

            $("#name").html(`*${$("#name > .before").text()}*` + `<span class="secret before">${$("#name > .before").text()}</span>`);
            close_menu();
        });
    }

    sessionStorage.setItem("username", user);
}

main();