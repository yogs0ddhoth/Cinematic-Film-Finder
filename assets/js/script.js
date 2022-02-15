$('#search-form').on('click', 'button', function(event) {
  console.log('test');
  event.preventDefault();
  let imdbAdvancedSearch = {
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  console.log(q);
  let qParam = '?title=' + q + '&title_type=feature,tv_movie,documentary';
  imdbAdvancedSearch.url += qParam;
  console.log(imdbAdvancedSearch);
  
  //* IMPORTANT: IF THIS SECTION IS COMMENTED OUT, AND THERE ARE NO FETCH RESPONSES IN LOCAL STORAGE
  // THE CODE WILL NOT RUN PROPERLY
  $.ajax(imdbAdvancedSearch).done(function (response) {
    let responseArray = response.results;
    console.log(responseArray);
    
    // set response to local storage so that rendering functionality can be tested without using limited api calls
    localStorage.setItem(q, JSON.stringify(responseArray));
    
    // clear previous search
    $('#results').empty();

    //  Run through a for loop for rendering:
    for (i = 0; i < responseArray.length; i++) {
      // assign imdb id to image card as an id to be called with jquery
      let imbdId = responseArray[i].id;

      // render image with title, and year as a tag - styled as a card/thumbnail
      let imdbDescrp = responseArray[i].description;
      let imdbImage = responseArray[i].image;
      let imdbTitle = responseArray[i].title;

      let $col = $('<div></div>', {
        'class': 'col-2',
        'style': 'margin-top:50px'
      }).appendTo($('#results'));
  
      let $card = $('<div></div>', {
        'id': imbdId,
        'class': 'card h-100',
        'style': 'background-color: transparent'
      }).appendTo($col);

      $('<img>', {
        'src': imdbImage.replace('original', '480x660'),
        'class': 'card-img-top',
        'alt': imdbTitle,
      }).appendTo($card);

      $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
      $('<button type="button" class="btn-btn-primary" data-toggle="modal" data-target="#infoModal"></button>').text('Info').appendTo($card);
    }
  })

  // // rendering functionality using local storage - for testing purposes
  // let responseArray = JSON.parse(localStorage.getItem(q));
  // //  Run through a for loop for rendering:
  // for (i = 0; i < responseArray.length; i++) {
  //   // assign imdb id to image card as an id to be called with jquery
  //   let imbdId = responseArray[i].id;

  //   // render image with title, and year as a tag - styled as a card/thumbnail
  //   let imdbDescrp = responseArray[i].description;
  //   let imdbImage = responseArray[i].image;
  //   let imdbTitle = responseArray[i].title;
    

  //   let $col = $('<div></div>', {
  //     'class': 'col-2',
  //     'style': 'margin-top:50px'
  //   }).appendTo($('#results'));

  //   let $card = $('<div></div>', {
  //     'id': imbdId,
  //     'class': 'card h-100',
  //     'style': 'background-color: transparent'
  //   }).appendTo($col);
  //   $('<img>', {
  //     'src': imdbImage.replace('original', '480x660'),
  //     'class': 'card-img-top',
  //     'alt': imdbTitle,
  //   }).appendTo($card);
  //   $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
  //   $('<button type="button" class="btn-btn-primary" data-toggle="modal" data-target="#infoModal"></button>').text('Info').appendTo($card);
  // }
}) 

$('#results').on('click', 'button', function(event) {
  console.log('test');
  let target = event.target;
  let targetEl = target.closest('div[id]');
  let targetId = targetEl.getAttribute('id');

  // call imdb youtube api using imdb id (found in .card div)
  let imdbYouTubeTrailer = {
    'url': 'https://imdb-api.com/en/API/YouTubeTrailer/k_5yme52ms/',
    'method': 'GET',
    'timeout': 0,
  }
  imdbYouTubeTrailer.url += targetId;
  console.log(imdbYouTubeTrailer);
  
  $.ajax(imdbYouTubeTrailer).done(function (response) {
    // use some other variable name 
   let imdbYoutubeArray = response;
   console.log(imdbYoutubeArray);
  

  })
  .then(function(){
    let omdbCall = 'https://www.omdbapi.com/?apikey=e51a32ad&i=' + targetId;
    let title = imdbYoutubeArray.title;
    let videoUrl = imdbYoutubeArray.videoUrl;

    $.ajax({
      url: omdbCall,
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      let actors = response.Actors;
      let director = response.Director;
      let genre = response.Genre;
      let plot = response.Plot;
      let rated = response.Rated;
      let ratings = response.Ratings;
      let released = response.Released;
      let imdb = response.ratings[0].source;
      let imdbscore = response.ratings[0].value;
      let rt = response.ratings[1].source;
      let rtscore = response.ratings[1].value;
      let meta = response.ratings[2].source;
      let metascore = response.ratings[2].value;
    });
  }

    //

    // render in modal
  ) 
})
