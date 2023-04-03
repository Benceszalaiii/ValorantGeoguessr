$("#continue").on("click", function () {
    var val = $("input[name='difficulty']:checked").val();
    var time = parseInt($("#time").val());
    if (val == undefined)
        return;

    sessionStorage.setItem("difficulty", val);
    sessionStorage.setItem("time", time);


    location = "game.html"
});


function changeTime() {
    var time = parseInt($("#time").val());
    
    mins = Math.floor(time/6);
    secs = (time%6)*10; 

    if (secs == 0)
        $("#num").text(`${mins} minutes`)
    else if (mins == 0)
        $("#num").text(`${secs} seconds`)
    else
        $("#num").text(`${mins} minutes, ${secs} seconds`)
}

changeTime()


