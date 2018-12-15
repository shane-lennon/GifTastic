var topics = ["SpongeBob", "Patrick", "Pickle Rick", "Wile E Coyote"]
var APIKey = "x1cJgoLFjEvXwQYBoPuMclxYDIE3ZFwb";
var results = {}

$(document).ready(function () {

  renderButtons();

  function renderButtons() {
    $("#topicButtons").empty();
    for (i = 0; i < topics.length; i++) {
      var b = $("<button class=topic>");

      b.text(topics[i]);
      $("#topicButtons").append(b);
    };
  };

  $("#submitButton").on("click", function (event) {
    event.preventDefault();
    var button = $("#input").val().trim();
    topics.push(button);
    renderButtons();
    $('#input').val('');
  });

  $(document).on("click", ".topic", grabGiphy);
  $(document).on("click", ".image-gifs", animateGiphy);

  // Gif grab from database.
  function grabGiphy() {
    var searchId = $(this).text();
    var searchStr = searchId.split(" ").join("+");
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchStr + "&api_key=" + APIKey;

    $.ajax({
      url: giphyURL,
      method: "GET"
    }).done(function (response) {
      results = response.data
      console.log(results);
      $("#gifSpace").empty();
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var h2 = $("<h2 class='rating'>").text("Rating: " + results[i].rating);
        var stillImage = $("<img>");

        stillImage.addClass("image-gifs")
        stillImage.attr("src", results[i].images.fixed_height_still.url);
        stillImage.attr("data-state", "still");
        stillImage.attr("index", i);
        gifDiv.append(stillImage);
        gifDiv.append(h2);
        gifDiv.addClass("individual-gifs")
        $("#gifSpace").prepend(gifDiv);
      };
    });
  };

  function animateGiphy() {
    var state = $(this).attr("data-state");
    var index = $(this).attr("index");
    index = parseInt(index);

    if (state === "still") {
      $(this).attr("src", results[index].images.fixed_height.url);
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", results[index].images.fixed_height_still.url);
      $(this).attr("data-state", "still");
    }
  };
});