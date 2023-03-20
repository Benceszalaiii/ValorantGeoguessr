$("document").ready(function() {
    $("#map").click(function(e) {
        var offset = $(this).offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;

        $("#marker").css("top", `${y + offset.top - 2.5}px`);
        $("#marker").css("left", `${x + offset.left - 2.5}px`);

        $("#coords").text(`x: ${x}, y: ${y}`)
    });

    $("button").click(function() {
        $("#map").attr("src", `../sources/minimaps/${$(this).text()}.png`)
    });
});