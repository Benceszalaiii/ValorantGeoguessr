$("#continue").on("click", function () {
    var val = $("input[name='difficulty']:checked").val();
    console.log(val)
    if (val == undefined)
        return;

    sessionStorage.setItem("difficulty", val);

    location = "game.html"
});

$("[type=range]").change(function() {
    var newval = $(this).val();
    $("#num").text(newval);
})


