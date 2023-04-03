var url = "https://script.google.com/macros/s/AKfycbzy2yq_h5KLT0lgybnX-bgnkhtAfPqyN1o9fFeEhaIfSO_Lb-qmS0CpvybD60p_8mZB/exec";

function add(name, point, time, map, difficulty, done, args) {
    $.ajax({
        url: url,
        type: "GET",
        data: {
            action: "add",
            name: name,
            point: point,
            time: time,
            map: map,
            difficulty: difficulty
        },
        success: function (response) {
            done(response, args);
        }
    })
}

function get(done, args) {
    $.ajax({
        url: url,
        type: "GET",
        data: {
            action: "get"
        },
        success: function (response) {
            done(JSON.parse(response), args);
        }
    })
}

function delElementByName(name) {
    get(function (response, args) {
        var row = response.find(value => value.name === args.name);
        var id = response.indexOf(row) + 1;
        if (id === 0) 
            return;

        del(response.indexOf(row)+1, (response, args) => {}, {})
    }, {name: name})
}

function del(id, done, args) {
    $.ajax({
        url: url,
        type: "GET",
        data: {
            action: "delete",
            id: id
        },
        success: function (response) {
            done(response, args);
        }
    })
}