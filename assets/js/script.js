$('#search-form').on('click', 'button', function() {
  console.log('test');
  let imdbSearchMovie = {
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  console.log(q);
  let qParam = '?title=' + q + '&title_type=feature,tv_movie,tv_special,documentary,short';
  imdbSearchMovie.url += qParam;
  console.log(imdbSearchMovie);
  $.ajax(imdbSearchMovie).done(function (response) {
    let responseArray = response.results;
    console.log(responseArray);
    
    //  Run through a for loop for rendering:
    for (i = 0; i < 30; i++) {
      // assign imdb id to image card as an id to be called with jquery
      let imbdId = responseArray[i].id;

      // render image with title, and year as a tag - styled as a card/thumbnail
      let imdbDescrp = responseArray[i].description;
      let imdbImage = responseArray[i].image;
      let imdbTitle = responseArray[i].title;
      
      //* IMAGE NOT RENDERING CORRECTLY: CHECK BOOTSTRAP
      let $card = $('<div></div>', {
        'id': imbdId,
        'class': 'card col',
      }).appendTo('#results');
      $('<img>', {
        'src': imdbImage.replace('original', '192x264'),
        'class': 'card-img-top',
        'alt': imdbTitle,
      }).appendTo($card);
      $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
    }
     
     
   
    
  });
})


// params:
// genre

// returned and rendered information:
//  from: OMDBI - Rotten Tomatoes score
//  

$("#search-form").submit(function(event) {
  event.preventDefault();
});