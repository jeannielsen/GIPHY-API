    // declare topics array

     var topics = ["Scuba Diving", "Hiking", "Skydiving", "Snowboarding", "Wake boarding", "Surfing", "White Water Rafting", "Kayaking", "Wind Surfing", "Snowshoeing"];
      
        // display function writes content to html

        function displayInfo(){

        // clear activitiesView container
         $("#activitiesView").empty();


            //create variable "activity" and set attribute

           var activity = $(this).attr("data-name");
           
        //Query GIPHY website 
        // my API key THUSOF44VgPCZx3c2rPeQSrsu3HnvvO5
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=THUSOF44VgPCZx3c2rPeQSrsu3HnvvO5&limit=10";


            // Performing AJAX GET request

      $.ajax({url: queryURL, method: "GET"})
      .done(function(response) {

        // looping through result items

        var results = response.data;

          for(var i=0; i < results.length; i++){

            // removing results with "r" or "pg-13" rating
             if (results[i].rating === "r" || results[i].rating === "pg-13")
             {

             }
             else {
              console.log(response)

              var rating = results[i].rating;
              
              var p = $("<p>").text( "Rating: " + rating);

              var activityImage = $("<img>");
            
              //giving the image tag an src attribute of property pulled off the result item and assigned class to activity image.
              activityImage.attr("src", results[i].images.fixed_height_still.url);
              activityImage.attr("data-still", results[i].images.fixed_height_still.url);
              activityImage.attr("data-animate", results[i].images.fixed_height.url);
              activityImage.attr("data-state", "still");
              activityImage.addClass("activityImage");
       
              // appending text and activity image to "activitiesView"
              $("#activitiesView").append(p);
              $("#activitiesView").append(activityImage);
              

             }

          }

     $(".activityImage").on("click", function(){
     
        // setting variable state and set attribute
         var state = $(this).attr("data-state"); 
           console.log(state);
         
           // if variable state equal still the update the src attribute of the image to "animate"
           if ( state === "still"){
               $(this).attr("src", $(this).data("animate"));
               $(this).attr("data-state", "animate");

               // else if state does not equal still then update the src attribute of the image to "still"
           }else{
               $(this).attr("src", $(this).data("still"));
               $(this).attr("data-state", "still");
           }
         
     });

       
     });   

 }

  // function for displaying activity data
 function createButtons(){ 
     
    //empty viewActivities
     $("#viewActivities").empty(); 

     //generate buttons and add class and attributes
       for (var i = 0; i < topics.length; i++){

       var btn = $("<button>") 
       btn.addClass("activity");  
       btn.attr("data-name", topics[i]); 
       btn.text(topics[i]); 
       $("#viewActivities").append(btn); 
   }
}
              
  ///=======================================================================         
                
               /// function to add activity on key click command and create button
                $("#addActivity").on("click", function(){
                  var activity = $("#newInput").val();
                    topics.push(activity);
                    createButtons();
                // added so user can hit return instead of using mouse click
                    return false;
                })
        // function for displaying the activity

         $(document).on("click", ".activity", displayInfo);

                createButtons();


 