$( document ).ready( function() {
  let imdbAdvancedSearch = {
     "url": "https://imdb-api.com/en/API/AdvancedSearch/k_e2n529l5",
    //* Alternative API Key. Use if above key calls return null:
    // "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    // ----------------------------------------------------------------
    "method": "GET",
    "timeout": 0,
  }
  // ** UNUSED CODE **
  
  // let q = $('#search-input').val();
  // console.log(q);
  // let param = '?title=' + '&title_type=feature,tv_movie,documentary';
  // imdbAdvancedSearch.url += param;
  // console.log(imdbAdvancedSearch);
  // --------------------------------------------------------
  if (sessionStorage.getItem('defaultResponse') !== null) {
    let responseArray = JSON.parse(sessionStorage.getItem('defaultResponse'));

    // clear previous search
    $('#results').empty();

    renderCards(responseArray);
  } else {
    let param = '?title=' + '&title_type=feature,tv_movie,documentary';
    imdbAdvancedSearch.url += param;
    $.ajax(imdbAdvancedSearch).done(function (response) {
      let responseArray = response.results;
      // console.log(responseArray);

      sessionStorage.setItem('defaultResponse', JSON.stringify(responseArray))

      // clear previous search
      $('#results').empty();

      renderCards(responseArray);
      
      // ** OBSOLETE ** see new function - renderCards()
      
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
      // ------------------------------------------------------------------------------------
    })
  }
})

// rendering loop for cards
function renderCards(responseArray) {
  responseArray.forEach(movie => {
    let $col = $('<div></div>', {
      'class': 'col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2',
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
    //* Alternative API Key. Use if above key calls return null:
    // "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    // ---------------------------------------------------------------
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  // console.log(q);
  let qParam = '?title=' + q + '&title_type=feature,tv_movie,documentary';
  imdbAdvancedSearch.url += qParam;
  // console.log(imdbAdvancedSearch);
   
  if (sessionStorage.getItem(q) !== null) {
    // recall previously searched information without using another API call
    let responseArray = JSON.parse(sessionStorage.getItem(q));

    // clear previous search
    $('#results').empty();
    
    renderCards(responseArray);
  } else {
    $.ajax(imdbAdvancedSearch).done(function (response) {
      let responseArray = response.results;
      // console.log(responseArray);

      // set response to local storage for economy of API calls
      sessionStorage.setItem(q, JSON.stringify(responseArray));

      // clear previous search
      $('#results').empty();

      renderCards(responseArray);

      // ** OBSOLETE ** see new function - renderCards()
      
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
      // ------------------------------------------------------------------------------------
    })
  }
  // ** OBSOLETE ** see sessionStorage boolean in lines 110-118
  
  // // rendering functionality using local storage - for testing purposes
  // let responseArray = JSON.parse(localStorage.getItem(q));
  // -----------------------------------------------------------
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
  // ----------------------------------------------------------------------------
}) 

$('#results').on('click', 'button', function(event) {
  // console.log('test');
  let target = event.target;
  let targetEl = target.closest('div[id]');
  let targetId = targetEl.getAttribute('id');
  

  // to call imdb youtube api using imdb id (found in .card div)
  let imdbYouTubeTrailer = {
    'url': 'https://imdb-api.com/en/API/YouTubeTrailer/k_8ptc1hgr/',
    //* Alternative API Key. Use if above key calls return null:
    // 'url': 'https://imdb-api.com/en/API/YouTubeTrailer/k_5yme52ms/',
    // -----------------------------------------------------------------
    'method': 'GET',
    'timeout': 0,
  }
  imdbYouTubeTrailer.url += targetId;
  
  
  $.ajax(imdbYouTubeTrailer).done(function (response) {
    // use some other variable name 
   let imdbYoutubeArray = response;
   sessionStorage.setItem(targetId, imdbYoutubeArray);
   return imdbYoutubeArray;

  }).then(function(imdbYoutubeArray){
    let omdbCall = 'https://www.omdbapi.com/?apikey=e51a32ad&i=' + targetId;
    
    // ** Obsolete ** rendering now uses template literals
    
    // let title = imdbYoutubeArray.title;
    // -----------------------------------------------------------
    let video = imdbYoutubeArray.videoUrl;
    let videoUrl = video.replace('watch?v=', 'embed/')

    $.ajax({
      url: omdbCall,
      method: 'GET',
    }).done(function (response) {
      // console.log(response);

      // ** Obsolete ** rendering now uses template literals
      
      // let actors = response.Actors;
      // let director = response.Director;
      // let genre = response.Genre;
      // let plot = response.Plot;
      // let poster = response.Poster;
      // let rated = response.Rated;
      // ------------------------------
      let ratings = response.Ratings;
      let ratingsArray = ratings.map(data => data);
      
      // ** UNUSED CODE **:
      
      // let released = response.Released;
      // ---------------------------------

      // ** Obsolete ** see above ratingsArray
      
      // let imdb = ratings[0].Source;
      // let imdbscore = ratings[0].Value;
      // let rt = ratings[1].Source;
      // let rtscore = ratings[1].Value;
      // let meta = ratings[2].Source;
      // let metascore = ratings[2].Value;
      // ----------------------------------

      let $modalBody = $('#m-body');
      

      // ** UNUSED CODE **
      
      // let $modalFooter = $('#m-footer');
      // ---------------------------------
      $modalBody.html('');

      $('#ModalLabel').text(response.Title);
      
      
      $('<img>', {
        'src': `${response.Poster}`,
        'class': 'col',
        'alt': 'Poster',
      }).appendTo($modalBody);
      
      let $info = $('<div></div>', {
        'id': 'info',
        'class': 'col',
      }).appendTo($modalBody);

      $('<p></p>').text(`Starring: ${response.Actors}`).appendTo($info);
      $('<p></p>').text(`Directed by: ${response.Director}`).appendTo($info);
      $('<p></p>').text(`Rated: ${response.rated}`).appendTo($info)
      $('<p></p>').text(`Genre: ${response.Genre}`).appendTo($info);
      $('<p></p>').text(`Plot: ${response.Plot}`).appendTo($info);
      
      // ** Obsolete ** see below forEach()
      
      // $('<p></p>').text(imdb + " " + imdbscore).appendTo($info);
      // $('<p></p>').text(rt + " " + rtscore).appendTo($info);      
      // $('<p></p>').text(meta + " " + metascore).appendTo($info);
      // ----------------------------------------------------------
      ratingsArray.forEach(rating => {
        $('<p></p>').text(`${rating.Source}: ${rating.Value}`).appendTo($info);
      })

      
      $('<iframe></iframe>', {
        'width': '100%',
        'height': '350',
        'src': videoUrl,
        'title': 'Youtube video player',
        // 'frameborder': '0',
      }).appendTo($modalBody);
      
      // ** UNUSED AND OBSOLETE ** 
      
      // let $scores = $('<div></div>', {
      //   'id': 'scores',
      //   'class': 'row',
      //   'style': '',
      // }).appendTo($modalFooter);

      // $('<p></p>').text(imdb + " " + imdbscore).appendTo($scores);
      
      // $('<p></p>').text(rt + " " + rtscore).appendTo($scores);
      
      // $('<p></p>').text(meta + " " + metascore).appendTo($scores);
      // -----------------------------------------------------------

    });
  }) 
})
