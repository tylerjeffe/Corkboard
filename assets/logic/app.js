let dataStore = {
    startDate: null,
    endDate: null,
    name: null,
    description: null
}

$(`#searchBtn`).on("click", function () {
    let searchCriteria = 'community';
    let url = "https://predicthq.p.rapidapi.com/v1/events/?category=" + searchCriteria + "&offset=10"
    $.ajax({
        url,
        method: "GET",
        headers: {
            "authorization": "Bearer tbJK965oKbaCIoKx1HpePpSe3h12kH",
            "x-rapidapi-key": "8addb057bamsh9ccd55dc462f4f4p1237d6jsn8ed930a43da9"
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
