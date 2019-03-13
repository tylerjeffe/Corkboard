$(function(){

   $("#create-event").on("click",function(event){
      event.preventDefault();

       newEventName=$("#event-name-input").val();
       newEventLocation=$("#event-location-input").val();
       newEventStartDate=$("#event-date-start-input").val();
       newEventStartTime=$("#event-time-start-input").val();
       newEventEndDate=$("#event-date-end-input").val();
       newEventEndTime=$("#event-time-end-input").val();
       newEventDescription=$("#event-description-input").val();


      database = firebase.database().ref('Events/'+ newEventName);

      database.set({

         Name: newEventName,
         Zipcode: newEventLocation,
         Start: newEventDate,
         Expire: newEventEndDate,
         StartTime: newEventTime,
         Description: newEventDescription,
         DateAdded: firebase.database.ServerValue.TIMESTAMP,
         Username: userName

      });
    });
 });