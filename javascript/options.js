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
        $("#num").html(`${mins} ${$("#num > .before").text()}` + `<span class="secret before">${$("#num > .before").text()}</span><span class="secret after">${$("#num > .after").text()}</span>`)
    else if (mins == 0)
        $("#num").html(`${secs} ${$("#num > .after").text()}` + `<span class="secret before">${$("#num > .before").text()}</span><span class="secret after">${$("#num > .after").text()}</span>`)
    else
        $("#num").html(`${mins} ${$("#num > .before").text()}, ${secs} ${$("#num > .after").text()}` + `<span class="secret before">${$("#num > .before").text()}</span><span class="secret after">${$("#num > .after").text()}</span>`)
}

changeTime()


