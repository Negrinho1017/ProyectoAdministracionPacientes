function httpGet() {
    return JSON.parse($.ajax({
        type: "GET",
        url: url,
        async: false
    }).responseText);
}

function httpGetPatientsPerMonth(beginDate, endDate) {
    return JSON.parse($.ajax({
        type: "GET",
        url: url + `/betweenDates?beginDate=${beginDate}&endDate=${endDate}`,
        async: false
    }).responseText);
}

function httpGetById(id) {
    return JSON.parse($.ajax({
        type: "GET",
        url: url + `/${id}`,
        async: false
    }).responseText);
}

function httpDelete(id) {
    $.ajax({
        type: "DELETE",
        url: url + `/${id}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    });
}

function httpPut(id, object) {
    $.ajax({
        type: "PUT",
        url: url + `/${id}`,
        data: JSON.stringify(object),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    });
}

function httpPost(object) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(object),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    });
}

var url = 'http://localhost:56000/api/main';