
$("#maps>img").on("click", function() {
    var map = $(this).attr("id");
    console.log(map)


    sessionStorage.setItem("map", map);
    window.location.href = "options.html";
});


$("#maps>img").hover(function(){
    var map = $(this).attr("id");
    $("#map-name").text(map)
},
function(){
    $("#map-name").text("​")
})

function main() {
    var user = getCookie("username");

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
