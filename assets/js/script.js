$( document ).ready( function() {
  let imdbAdvancedSearch = {
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_e2n529l5",
    "method": "GET",
    "timeout": 0,
  }
  // let q = $('#search-input').val();
  // console.log(q);
  let param = '?title=' + '&title_type=feature,tv_movie,documentary';
  imdbAdvancedSearch.url += param;
  // console.log(imdbAdvancedSearch);
  
  $.ajax(imdbAdvancedSearch).done(function (response) {
    let responseArray = response.results;
    console.log(responseArray);
    
    // clear previous search
    $('#results').empty();

    renderCards(responseArray);
    // --------------------------------------------------------------------------------
    // //  ** OBSOLETE ** see new function - renderCards()
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
    //     'class': 'card h-100 border-0',
    //     'style': 'background-color: transparent'
    //   }).appendTo($col);

    //   $('<img>', {
    //     'src': imdbImage.replace('original', '480x660'),
    //     'class': 'card-img-top',
    //     'alt': imdbTitle,
    //   }).appendTo($card);

    //   $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
    //   $('<button type="button" class="btn btn-light align-items-end" data-toggle="modal" data-target="#infoModal"></button>').text('More Information').appendTo($card);
    // }
  })
})

// rendering loop for cards
function renderCards(responseArray) {
  responseArray.forEach(movie => {
    let $col = $('<div></div>', {
      'class': 'col-sm-12 col-lg-3 col-xl-2',
      'style': 'margin-top:50px'
    }).appendTo($('#results'));

    let $card = $('<div></div>', {
      'id': movie.id,
      'class': 'card h-100 border-0',
      'style': 'background-color: transparent'
    }).appendTo($col);

    $('<img>', {
      'src': movie.image.replace('original', '480x660'),
      'class': 'card-img-top',
      'alt': movie.title,
    }).appendTo($card);

    $('<h2></h2>').text(`${movie.title} ${movie.description}`).appendTo($card);
    $('<button></button>', {
      'type': "button",
      'class': "btn btn-light align-items-end",
      'data-toggle': "modal",
      'data-target': "#infoModal",
    }).text('More Information').appendTo($card);
  });
}

$('#search-form').on('click', 'button', function(event) {
  console.log('test');
  event.preventDefault();
  let imdbAdvancedSearch = {
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_e2n529l5",
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  console.log(q);
  let qParam = '?title=' + q + '&title_type=feature,tv_movie,documentary';
  imdbAdvancedSearch.url += qParam;
  console.log(imdbAdvancedSearch);
  
  $.ajax(imdbAdvancedSearch).done(function (response) {
    let responseArray = response.results;
    console.log(responseArray);
    
    // set response to local storage so that rendering functionality can be tested without using limited api calls
    localStorage.setItem(q, JSON.stringify(responseArray));
    
    // clear previous search
    $('#results').empty();
    
    renderCards(responseArray);

    // --------------------------------------------------------------------------------
    // //  ** OBSOLETE ** see new function - renderCards()
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
    //     'class': 'card h-100 border-0',
    //     'style': 'background-color: transparent'
    //   }).appendTo($col);

    //   $('<img>', {
    //     'src': imdbImage.replace('original', '480x660'),
    //     'class': 'card-img-top',
    //     'alt': imdbTitle,
    //   }).appendTo($card);

    //   $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
    //   $('<button type="button" class="btn btn-light align-items-end" data-toggle="modal" data-target="#infoModal"></button>').text('More Information').appendTo($card);
    // }
  })
  
  // // rendering functionality using local storage - for testing purposes
  // let responseArray = JSON.parse(localStorage.getItem(q));
  
  // --------------------------------------------------------------------------------
    // //  ** OBSOLETE ** see new function - renderCards()
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
    'url': 'https://imdb-api.com/en/API/YouTubeTrailer/k_8ptc1hgr/',
    'method': 'GET',
    'timeout': 0,
  }
  imdbYouTubeTrailer.url += targetId;
  console.log(imdbYouTubeTrailer);
  
  $.ajax(imdbYouTubeTrailer).done(function (response) {
    // use some other variable name 
   let imdbYoutubeArray = response;
   console.log(imdbYoutubeArray);
   return imdbYoutubeArray;

  })

  .then(function(imdbYoutubeArray){
    let omdbCall = 'https://www.omdbapi.com/?apikey=e51a32ad&i=' + targetId;
    let title = imdbYoutubeArray.title;
    let video = imdbYoutubeArray.videoUrl;
    let videoUrl = video.replace('watch?v=', 'embed/')

    $.ajax({
      url: omdbCall,
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      let actors = response.Actors;
      let director = response.Director;
      let genre = response.Genre;
      let plot = response.Plot;
      let poster = response.Poster;
      let rated = response.Rated;
      let ratings = response.Ratings;
      let released = response.Released;
      let imdb = ratings[0].Source;
      let imdbscore = ratings[0].Value;
      let rt = ratings[1].Source;
      let rtscore = ratings[1].Value;
      let meta = ratings[2].Source;
      let metascore = ratings[2].Value;
      
      let $modalBody = $('#m-body');
      let $modalFooter = $('#m-footer');
      
      $modalBody.html('');
      
      $('#ModalLabel').text(title);
      
      $('<img>', {
        'src': poster,
        'class': 'col',
        'alt': 'Poster',
      }).appendTo($modalBody);
      
      let $cast = $('<div></div>', {
        'id': 'cast',
        'class': 'col',
      }).appendTo($modalBody);

      $('<p></p>').text("Starring: " + actors).appendTo($cast);
      $('<p></p>').text("Directed by: " + director).appendTo($cast);
      $('<p></p>').text("Genre: " + genre).appendTo($cast);
      $('<p></p>').text("Plot: " + plot).appendTo($cast);
      $('<p></p>').text(imdb + " " + imdbscore).appendTo($cast);
      $('<p></p>').text(rt + " " + rtscore).appendTo($cast);      
      $('<p></p>').text(meta + " " + metascore).appendTo($cast);
      
      $('<iframe></iframe>', {
        'width': '650',
        'height': '315',
        'src': videoUrl,
        'title': 'Youtube video player',
        // 'frameborder': '0',
      }).appendTo($modalBody);
      
      // let $scores = $('<div></div>', {
      //   'id': 'scores',
      //   'class': 'row',
      //   'style': '',
      // }).appendTo($modalFooter);

      // $('<p></p>').text(imdb + " " + imdbscore).appendTo($scores);
      
      // $('<p></p>').text(rt + " " + rtscore).appendTo($scores);
      
      // $('<p></p>').text(meta + " " + metascore).appendTo($scores);
      

    });
  }) 
})
