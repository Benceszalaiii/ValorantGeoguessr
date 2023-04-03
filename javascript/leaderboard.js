get(function (response, args) {
    response.sort(function (a, b) {return (a.point - b.point) * -1});
    tops = response.slice(0, 10);

    table = "";
    for (i = 0; i < tops.lenght; i++) {
        user = tops[i]
        table = table + `<tr><td>#${i + 1}</td><td>${user.name}</td><td>${user.point}</td><td>${user.map}</td></tr>`
    }

    $("#leaderboard>tbody").html(table)
}, {})