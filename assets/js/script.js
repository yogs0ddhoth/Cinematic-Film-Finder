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
  
  // //* IMPORTANT: IF THIS SECTION IS COMMENTED OUT, AND THERE ARE NO FETCH RESPONSES IN LOCAL STORAGE
  // // THE CODE WILL NOT RUN PROPERLY
  // $.ajax(imdbAdvancedSearch).done(function (response) {
  //   let responseArray = response.results;
  //   console.log(responseArray);
    
  //   // set response to local storage so that rendering functionality can be tested without using limited api calls
  //   localStorage.setItem(q, JSON.stringify(responseArray));
    
  //   //  Run through a for loop for rendering:
  //   for (i = 0; i < responseArray.length; i++) {
  //     // assign imdb id to image card as an id to be called with jquery
  //     let imbdId = responseArray[i].id;

  //     // render image with title, and year as a tag - styled as a card/thumbnail
  //     let imdbDescrp = responseArray[i].description;
  //     let imdbImage = responseArray[i].image;
  //     let imdbTitle = responseArray[i].title;
      
  //     $('#results').empty();

  //     let $col = $('<div></div>', {
  //       'class': 'col',
  //     }).appendTo($('#results'));

  //     let $card = $('<div></div>', {
  //       'id': imbdId,
  //       'class': 'card',
  //     }).appendTo($col);
  //     $('<img>', {
  //       'src': imdbImage.replace('original', '192x264'),
  //       'class': 'card-img-top',
  //       'alt': imdbTitle,
  //     }).appendTo($card);
  //     $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
  //     $('<button type="button" class="btn-btn-primary" data-toggle="modal" data-target="#infoModal"></button>').text('Info').appendTo($card);
  //   }
  // });
  
  
  // rendering functionality using local storage - for testing purposes
  let responseArray = JSON.parse(localStorage.getItem(q));
  //  Run through a for loop for rendering:
  for (i = 0; i < responseArray.length; i++) {
    // assign imdb id to image card as an id to be called with jquery
    let imbdId = responseArray[i].id;

    // render image with title, and year as a tag - styled as a card/thumbnail
    let imdbDescrp = responseArray[i].description;
    let imdbImage = responseArray[i].image;
    let imdbTitle = responseArray[i].title;
    

    let $col = $('<div></div>', {
      'class': 'col',
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


// params:
// genre

// returned and rendered information:
//  from: OMDb - Rotten Tomatoes score
//  

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
    let responseArray = response;
    console.log(responseArray);
    // use:
      // *title
      // *videoUrl
  }).then(
    // call omdb api
    // assign result a variable and console log result
    // use:
    //  *Actors
    //  *Director
    //  *Genre
    //  *Plot
    //  *Rated
    //  *Ratings <- returns array of imdbYouTubeTrailer, rotten tomatoes, and metacritic
    //  *Released
    //

    // render in modal
  ) 
})