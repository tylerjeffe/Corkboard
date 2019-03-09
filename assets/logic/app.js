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
var userName;


// for creating event
var event = firebase.database().ref('Events/' + eventName); 


// for saving event for users
var user = firebase.database().ref('Users/' + userName + eventName);


// add event details
$('#create-event-button').on('click', function() {
  // store event name in global variable
  eventName = $('#event-name').text().trim();
    event.set({
      Name: 'Name of Event',
      Description: 'val',
      Start: 'time',
      Expire: 'time',
      Zipcode: 'zip',
      Admin: userName
    });
});


// create stored events
$('#save-event-button').on('click', function() {
  // userName needs to be stored on login

  // store event name in global variable
  eventName = $('#event-name').text().trim();
  user.set({
    Name: 'event name',
    Start: 'time',
    Expire: 'time',
    Description: 'string',
    Zipcode: 'zip'
  });
});


// delete event
$('#delete-event-button').on('click', function() {

  eventName = $('#event-name').text().trim();
  return event.once('value').then(function(snapshot) {
    if (snapshot.child('username').val() === userName) {
      event.remove();
    };
  });
});

