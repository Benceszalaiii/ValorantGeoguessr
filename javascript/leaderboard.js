get(function (response, args) {
    response.sort(function (a, b) {return (a.point - b.point) * -1});

    table = "";
    for (i = 0; i < response.length; i++) {
        user = response[i]
        table = table + `<tr><td>#${i + 1}</td><td>${user.name}</td><td>${user.point}</td><td>${user.time} sec</td><td>${user.map}</td><td>${user.difficulty}</td></tr>`
    }

    $("#leaderboard>tbody").html(table)
}, {})