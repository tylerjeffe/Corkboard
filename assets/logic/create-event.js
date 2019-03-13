$(function(){

    let config = {
       apiKey: "AIzaSyBbdB0Z13saO2C5CbwRn6sNvyR9jFuYrtA",
       authDomain: "eventsearch-9871b.firebaseapp.com",
       databaseURL: "https://eventsearch-9871b.firebaseio.com",
       projectId: "eventsearch-9871b",
       storageBucket: "eventsearch-9871b.appspot.com",
       messagingSenderId: "329903550973"
     };
 
    firebase.initializeApp(config);
 
    let newEventName = "";
    let newEventLocation = "";
    let newEventDate = "";
    let newEventTime = "";
    let newEventDescription = "";
    let userName= "user"
 
    let database = firebase.database().ref('Events/'+newEventName);
 
 
   
    $("#create-event").on("click",function(event){
       event.preventDefault();
 
        newEventName=$("#event-name-input").val();
        newEventLocation=$("#event-location-input").val();
        newEventStartDate=$("#event-date-start-input").val();
        newEventStartTime=$("#event-time-start-input").val();
        newEventEndDate=$("#event-date-end-input").val();
        newEventEndTime=$("#event-time-end-input").val();
        newEventDescription=$("#event-description-input").val();
        
 
       database = firebase.database().ref('Events/'+newEventName);
 
       database.set({
 
          Name: newEventName,
          Zipcode: newEventLocation,
          Start: newEventDate,
          Expire: newEvent
          StartTime: newEventTime,
          Description: newEventDescription,
          DateAdded: firebase.database.ServerValue.TIMESTAMP,
          Admin: userName
 
       });
     });
 
    database.on("child_added", function(childSnapshot) {
 
       console.log(childSnapshot.val().name);
       console.log(childSnapshot.val().location);
       console.log(childSnapshot.val().date);
       console.log(childSnapshot.val().time);
       console.log(childSnapshot.val().description);
 
    });
 
    database.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
       
       let newEventCard = $("<card>");
 
       let cardName = $("<h3>").text(snapshot.val().name);
       let cardLocation = $("<h4>").text(snapshot.val().location);
       let cardDate = $("<h4>").text(snapshot.val().date);
       let cardTime = $("<h4>").text(snapshot.val().time);
       let cardDescription = $("<h4>").text(snapshot.val().description);
 
       newEventCard.append(cardName, cardLocation, cardDate, cardTime, cardDescription);
       $("#created-events-here").append(newEventCard);
    });
 });
 