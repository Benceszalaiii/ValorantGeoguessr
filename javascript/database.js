var url = "https://script.google.com/macros/s/AKfycbzwik45_61_LN6_gFMDoeVjn9hRPU6iXLKf3wOvylOoVwdvr-7Qbu72tAkE6zeFUtA/exec";

function add(name, point, map, done, args) {
    $.ajax({
        url: url,
        type: "GET",
        data: {
            action: "add",
            name: name,
            point: point,
            map: map
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

        del(response.indexOf(row)+1, (response, args) => {
            console.log(response);
        }, {})
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