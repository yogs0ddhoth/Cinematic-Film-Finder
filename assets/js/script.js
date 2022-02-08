$('#search-form').on('click', 'button', function() {
  console.log('test');
  let imdbSearchMovie = {
    "url": "https://imdb-api.com/en/API/SearchMovie/k_5yme52ms/",
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  console.log(q);
  imdbSearchMovie.url += q;
  console.log(imdbSearchMovie);
  $.ajax(imdbSearchMovie).done(function (response) {
    let responseArray = response.results;
    console.log(responseArray);
    // render image with title and description as a tag.
    // save responseArray[i].title, and responseArray[i].description <- get inner 4 chars and save
    // 
  });
})


// params:
// genre

// returned and rendered information:
//  from: Rotten Tomatoes apiKey,
//  movies.ratings.(critics_rating, audience_rating)
//  abridged_cast[]

$("#search-form").submit(function(event) {
  event.preventDefault();
});