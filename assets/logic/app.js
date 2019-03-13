'use strict';
// added cyper text
let newToken = 'TFZtRGs5MjNSY0hEdjdoZDgwdFc4RjBQNU9ZU2ZBbHo';
let newUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${atob(newToken)}&size=2`


// let token = 'dGJKSzk2NW9LYmFDSW9LeDFIcGVQcFNlM2gxMmtI';
// let key = `OGFkZGIwNTdiYW1zaDljY2Q1NWRjNDYyZjRmNHAxMjM3ZDZqc244ZWQ5MzBhNDNkYTk`;

let dataStore = {
    startDate: null,
    endDate: null,
    name: null,
    description: null
}

function loadEvents() {
    let url = newUrl + "&postalCode=" + locationCriteria + "&keyword=" + searchCriteria;
    let method = "GET";
    $.ajax({
        url,
        method
    }).then((response) => {
        let counter = 0;
        console.log(response._embedded.events);
        $('#backgroundVideo').remove();
        $('.content').html('').css('position', 'static').attr('class', 'content row mt-5');
        response._embedded.events.map(event => {
            let resultDiv = $('<div>').attr('class', 'jumbotron text-center mt-3').attr('id', 'new-jumbo');
            console.log('start', event.dates.start.localDate);
            console.log('end', event.sales.public.endDateTime);
            dataStore.startDate = moment(event.dates.start.localDate).format('dddd, MMMM Do YYYY');
            dataStore.endDate = moment(event.sales.public.endDateTime).format('dddd, MMMM Do YYYY');
            dataStore.name = event.name;
            dataStore.description = event.name;
            let startDateDiv = $('<p>').attr('class', 'row mt-5').attr('id', `startDate-${counter}`).text(`Start Date: ${dataStore.startDate}`);
            let endDateDiv = $('<p>').attr('class', 'row').attr('id', `endDate-${counter}`).text(`End Date: ${dataStore.endDate}`);
            let nameDiv = $('<h3>').attr('class', 'row').attr('id', `name-${counter}`).text(`Event: ${dataStore.name}`);
            let descriptionDiv = $('<p>').attr('class', 'row').attr('id', `description-${counter}`).text(dataStore.description);
            let addButton = $('<button>').attr('class', 'fun-button landing-button row save-event-button').attr('id', `save-event-button-${counter}`).text('Save Event');
            resultDiv.append(nameDiv, startDateDiv, endDateDiv, descriptionDiv, addButton);
            $('.content').append(resultDiv);
            counter++;
        })
    }).catch(function(){
        alert('No events found');
    });
}

let searchCriteria;
let locationCriteria;
$(`#searchBtn`).on("click", function () {
    let searchTerms = ['event','volunteer','attraction','conferences', 'politics', 'concerts', 'festivals', 'performing-arts', 'sports', 'community', 'airport', 'weather', 'disasters', 'terror'];
    searchCriteria = $('#landing-inp').val();
    locationCriteria = $('#zipcode').val();
    if (searchTerms.indexOf(searchCriteria) > -1) {
        $('.search-form').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        setTimeout(loadEvents, 1000);
    } else {
        $('#search-jumbo').attr('class', 'container col-6')
        let searchCriteriaDiv = $('<div>').attr('class', 'container col-6');
        let jumbotron = $('<div>').attr('class', 'text-center');
        let paragraph = $('<div>').attr('class', 'text-left').html('<p>None found. Try using one of these search terms:</p><div class="row"><div class="col"><ul><li>school-holidays</li><li>public-holidays</li><li>observances</li><li>politics</li><li>conferences</li><li>expos</li><li>concerts</li><li>festivals</li></ul></div><div class="col"><ul><li>performing-arts</li><li>sports</li><li>community</li><li>daylight-savings</li><li>airport-delays</li><li>severe-weather</li><li>disasters</li><li>terror</li></ul></div></div></div></div>');
        jumbotron.append(paragraph);
        searchCriteriaDiv.append(jumbotron);
        $('.content').prepend(searchCriteriaDiv);
    }
});


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbdB0Z13saO2C5CbwRn6sNvyR9jFuYrtA",
    authDomain: "eventsearch-9871b.firebaseapp.com",
    databaseURL: "https://eventsearch-9871b.firebaseio.com",
    projectId: "eventsearch-9871b",
    storageBucket: "eventsearch-9871b.appspot.com",
    messagingSenderId: "329903550973"
};
firebase.initializeApp(config);
// Global variables init empty to be stored by user
var eventName;
var username = sessionStorage.getItem('username');
if (username != null) {
    $('.user-id').text(`Logged in as: ${username}`);
}
// for creating event
var event = firebase.database().ref('Events/' + eventName);
// for saving event for users
var user = firebase.database().ref('Users/' + username + eventName);


// add event details
$('#create-event-button').on('click', function () {
    // store event name in global variable
    eventName = $('#event-name').text().trim();
    event.set({
        Name: 'Name of Event',
        Description: 'val',
        Start: 'time',
        Expire: 'time',
        Zipcode: 'zip',
        Admin: username
    });
});


// create stored events
$('.content').on('click', '.save-event-button', function () {
    if (username === null) {
        return;
    };
    let string = $(this).attr('id');
    let buttonText = $(this);
    string = string.replace('save-event-button-', '');
    $(this).html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    let eventName = $(`#name-${string}`).text();
    let startDate = $(`#startDate-${string}`).text();
    let expireDate = $(`#endDate-${string}`).text();
    let description = $(`#description-${string}`).text();

    user = firebase.database().ref('Users/' + username + '/' + eventName);

    user.set({
        Name: eventName,
        Start: startDate,
        Expire: expireDate,
        Description: description,
        Zipcode: 'zip'
    });
    setTimeout(function (string) {
        buttonText.html('Event Saved<br><i class="far fa-save"></i> ');
    }, 500)

});


// delete event
$('#delete-event-button').on('click', function () {
    eventName = $('#event-name').text().trim();
    return event.once('value').then(function (snapshot) {
        if (snapshot.child('username').val() === userName) {
            event.remove();
        };
    });
});

// Create user
$('#sign-up-button').on('click', function () {
    username = $('#username').val();
    var password = $('#password').val();
    user = firebase.database().ref('Users/' + username);
    $('.alert-div').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    setTimeout(function () {
        return firebase.database().ref('/Users/').once('value').then(function (snapshot) {
            if (snapshot.child(username).exists()) {
                $('.alert-div').text('');
                let alertDiv = $('<p>').text('Username is already taken, please try a different username').css('color', '#4C586F');
                $('.alert-div').prepend(alertDiv);
                return;
            }
            user.set({
                Username: username,
                Password: password
            })
            sessionStorage.setItem('username', username);
            window.location = "index.html";
        });
    }, 1000)
});

// login as user
$('#log-in-button').on('click', function () {
    username = $('#username').val();
    var password = $('#password').val();
    user = firebase.database().ref('Users/' + username);
    $('.alert-div').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    setTimeout(function () {
        return firebase.database().ref('/Users/').once('value').then(function (snapshot) {
            // console.log(snapshot.child(username).child('Password').val());
            if (snapshot.child(username).exists()) {
                if (snapshot.child(username).child('Password').val() === password) {
                    sessionStorage.setItem('username', username);
                    window.location = "index.html";
                } else {
                    $('.alert-div').html('');
                    let alertDiv = $('<p>').text('Username or password is incorrect. Please try again.');
                    $('.alert-div').prepend(alertDiv);
                }
            }
        });
    }, 1000)
});


// if (window.location === '/userPage.html') {
username = sessionStorage.getItem('username');
user = firebase.database().ref('Users/' + username);
user.once('value').then(function (snapshot) {
    snapshot.forEach((child) => {
        if (child.key != 'Username' && child.key != 'Password') {
            let newDiv = $('<div>').attr('class', 'container event-row mt-2');
            let description = $('<p>').text(child.child('Description').val());
            let expire = $('<p>').text(child.child('Expire').val());
            let name = $('<h3>').text(child.child('Name').val());
            let start = $('<p>').text(child.child('Start').val());
            newDiv.append(name, start, expire, description);
            $('.event-content').append(newDiv);
        }

    })
});
// Logic to get location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    $.ajax({
        type: "GET",
        url: `${newUrl}&latlong=${latlon}`,
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            var e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEvents(json);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function showEvents(json) {
    for (var i = 0; i < json.page.size; i++) {
        $("#events").append("<p>" + json._embedded.events[i].name + "</p>");
    }
}

getLocation();