    // declare topics array

     var topics = ["Scuba Diving", "Hiking", "Skydiving", "Snowboarding", "Wake boarding", "Surfing", "White Water Rafting", "Kayaking", "Wind Surfing", "Snowshoeing"];
      
        // create buttons

        function displayInfo(){

         $("#activitiesView").empty();



 // my API key THUSOF44VgPCZx3c2rPeQSrsu3HnvvO5

           var activity = $(this).attr("data-name");
           
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=THUSOF44VgPCZx3c2rPeQSrsu3HnvvO5&limit=10";

      $.ajax({url: queryURL, method: "GET"})
      .done(function(response) {
          var results = response.data;

          for(var i=0; i < results.length; i++){

             if (results[i].rating == "r" || results[i].rating == "pg-13")
             {

             }
             else {
              console.log(response)

              var rating = results[i].rating;
              
              var p = $("<p>").text( "Rating: " + rating);

              var activityImage = $("<img>");
            
              activityImage.attr("src", results[i].images.fixed_height_still.url);
              activityImage.attr("data-still", results[i].images.fixed_height_still.url);
              activityImage.attr("data-animate", results[i].images.fixed_height.url);
              activityImage.attr("data-state", "still");
              activityImage.addClass("activityImage");
              
              $("#activitiesView").append(p);
              $("#activitiesView").append(activityImage);
              

             }

          }

     $(".activityImage").on("click", function(){
     
         var state = $(this).attr("data-state"); 
           console.log(state);
         
           if ( state == "still"){
               $(this).attr("src", $(this).data("animate"));
               $(this).attr("data-state", "animate");
           }else{
               $(this).attr("src", $(this).data("still"));
               $(this).attr("data-state", "still");
           }
         
     });

       
     });   

 }

  
 function createButtons(){ 
     $("#viewActivities").empty(); 
   for (var i = 0; i < topics.length; i++){

       var a = $("<button>") 
       a.addClass("activity");  
       a.attr("data-name", topics[i]); 
       a.text(topics[i]); 
       $("#viewActivities").append(a); 
   }
}
              
  ///=======================================================================         
                
               /// sets a button from input
                $("#addActivity").on("click", function(){
                  var activity = $("#newInput").val();
                    topics.push(activity);
                    createButtons();
                    return false;
                })

         $(document).on("click", ".activity", displayInfo);

                createButtons();


 