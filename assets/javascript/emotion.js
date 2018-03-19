 // ************* GIFS Provided by GIPHY ***************
    
// ------------------------------------------------- My initial array of emotions -------------------------
var emotionArray = "cry,happy,surprised,drunk,excited,sleepy,awkward,frustrated,hungry,bored,sassy,confused,tired".split(",")
console.log(emotionArray)

function renderButtons() {                      //  -------- creating buttons for the array ---------------
    $("#emo-nav").empty();
    for(var i = 0; i < emotionArray.length; i++) {
        var x = $("<button>");
        x.addClass("emotionBtn");
        x.attr("emotion-name", emotionArray[i]);
        x.text(emotionArray[i]);
        $("#emo-nav").append(x);
        }
};

// ---------------------------------------------- Creating Buttons from Input ----------------------------
$("#add-emotion").on("click", function(event) {
    event.preventDefault();
    var emotion = $("#emotion-input").val().trim();
    emotionArray.push(emotion);
    renderButtons();
    console.log(event)
});
renderButtons();

// ------------------------------------------- Getting GIFS from GIPHY on Click -------------------------------
function giphyGifs () {
    var emotion = $(this).attr("emotion-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    emotion + "&api_key=dc6zaTOxFJmzC&limit=10";

    console.log(emotion)
    console.log(this)

    $.ajax({url: queryURL, method: "GET"}).then(function(response) {
        console.log(response);

        var results  = response.data
        console.log(results);
        
        $("#gifs-appear-here").empty();

        for (var i = 0; i < results.length; i++) {
            var emoDiv = $("<div>");
            emoDiv.addClass("emoGif");

            var p = $("<p>").text("Rating: " + results[i].rating);
            
            var emoImage = $("<img>");  // -------------------- setting attributes ---------------
            emoImage.addClass("img-responsive");
            emoImage.attr('src', results[i].images.fixed_height.url);
            emoImage.attr("data-still", results[i].images.fixed_height_still.url);
            emoImage.attr("data-animate", results[i].images.fixed_height.url);
            emoImage.attr("data-state", "still");
            // Append the p variable to the Div variable.
            emoDiv.append(p);
            // Append the emoImage variable to the Div variable.
            emoDiv.append(emoImage)
            // Prepend the Div variable to the element with an id of gifs-appear-here.
            console.log(emoImage)
            $("#gifs-appear-here").prepend(emoDiv);
        };
    });
// });
}        
// ------------------------------------------  setting GIFS to animate or still ---------------------------
console.log(this);
function animator() {
    var state = $(this).find("img").attr("data-state")
    if(state === "still") {             // this will make gif animate or still upon click.
    //     $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    //     $(this).find("img").attr("data-state", "animate");
    // } else {
    //     $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    //     $(this).find("img").attr("data-state", "still");
    // }
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state", "still");
    } else {
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
}
};
// 
$(document).ready(function() {
    renderButtons();
    animator();
});
$(document).on("click", ".emotionBtn", giphyGifs);

$(document).on("click", ".emoGif", animator);
