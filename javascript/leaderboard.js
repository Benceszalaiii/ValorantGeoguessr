var map = $("#Map").val()
var difficulty = $("#Difficulty").val()
var sort;

get(function (response, args) {
    response.sort(function (a, b) {return (a.point - b.point) * -1});
    map = $("#Map").val()
    difficulty = $("#Difficulty").val()

    console.log(map,difficulty)

    table = "";

    for (i = 0; i < response.length; i++) {
        user = response[i]
        table = table + `<tr><td>#${i + 1}</td><td>${user.name}</td><td>${user.point}</td><td>${user.time} sec</td><td>${user.map}</td><td>${user.difficulty}</td></tr>`
    }

    $("#leaderboard>tbody").html(table)
}, {})

$("#Map").change(function(){
    map = $(this).val()
    select()
})

$("#Difficulty").change(function(){
    difficulty = $(this).val()
    select()
})

function select(){
    get(function (response, args){
        response.sort(function (a, b) {return (a.point - b.point) * -1});
        sort = response.filter(val => (map == "All" ? "All" : val.map == map) && (difficulty == "All" ? "All" : val.difficulty == difficulty) ) 

        table = ""
        for (i = 0; i < sort.length; i++) {
            user = sort[i]
            table = table + `<tr><td>#${i + 1}</td><td>${user.name}</td><td>${user.point}</td><td>${user.time} sec</td><td>${user.map}</td><td>${user.difficulty}</td></tr>`
        }

        $("#leaderboard>tbody").html(table)
    },{})

}