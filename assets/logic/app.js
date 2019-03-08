'use strict';

// added cyper text
let token = 'dGJKSzk2NW9LYmFDSW9LeDFIcGVQcFNlM2gxMmtI';
let key = 'OGFkZGIwNTdiYW1zaDljY2Q1NWRjNDYyZjRmNHAxMjM3ZDZqc244ZWQ5MzBhNDNkYTk';

let dataStore = {
    startDate: null,
    endDate: null,
    name: null,
    description: null
}

$(`#searchBtn`).on("click", function () {
    let searchCriteria = 'community';
    let url = "https://predicthq.p.rapidapi.com/v1/events/?category=" + searchCriteria + "&offset=10";
    let method = "GET";

    $.ajax({
        url,
        method,
        headers: {
            "authorization": `Bearer ${atob(token)}`,
            "x-rapidapi-key": `${atob(key)}`
        }
    }).then((response) => {
        if (!response.results.length) {
            alert('No record found')
            return;
        }
        console.log(response.results);
        response.results.map(event => {
            dataStore.startDate = event.start;
            dataStore.endDate = event.end;
            dataStore.name = event.title;
            dataStore.description = event.description;
            console.log(dataStore);
        })
    });
});
