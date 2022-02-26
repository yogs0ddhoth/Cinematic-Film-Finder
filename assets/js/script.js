$( document ).ready( function() {
  let imdbAdvancedSearch = {
    // "url": "https://imdb-api.com/en/API/AdvancedSearch/k_e2n529l5",
    //* Alternative API Key. Use if above key calls return null:
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    // ----------------------------------------------------------------
    "method": "GET",
    "timeout": 0,
  }
 
  if (sessionStorage.getItem('defaultResponse') !== null) {
    // render from saved API call (see line 26)
    let responseArray = JSON.parse(sessionStorage.getItem('defaultResponse'));

    // clear previous search
    $('#results').empty();

    renderCards(responseArray);
  } else {
    let param = '?title=' + '&title_type=feature,tv_movie,documentary';
    imdbAdvancedSearch.url += param;
    $.ajax(imdbAdvancedSearch).done(function (response) {
      let responseArray = response.results;
      
      // save call to session storage to save API calls
      sessionStorage.setItem('defaultResponse', JSON.stringify(responseArray))

      // clear previous search
      $('#results').empty();

      renderCards(responseArray);
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
  event.preventDefault();
  let imdbAdvancedSearch = {
    // "url": "https://imdb-api.com/en/API/AdvancedSearch/k_e2n529l5",
    //* Alternative API Key. Use if above key calls return null:
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    // ---------------------------------------------------------------
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  let qParam = '?title=' + q + '&title_type=feature,tv_movie,documentary';
  imdbAdvancedSearch.url += qParam;
   
  if (sessionStorage.getItem(q) !== null) {
    // recall previously searched information without using another API call
    let responseArray = JSON.parse(sessionStorage.getItem(q));

    // clear previous search
    $('#results').empty();
    
    renderCards(responseArray);
  } else {
    $.ajax(imdbAdvancedSearch).done(function (response) {
      let responseArray = response.results;

      // set response to local storage for economy of API calls
      sessionStorage.setItem(q, JSON.stringify(responseArray));

      // clear previous search
      $('#results').empty();

      renderCards(responseArray);
    })
  }
}) 

$('#results').on('click', 'button', function(event) {
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
    let video = imdbYoutubeArray.videoUrl;
    let videoUrl = video.replace('watch?v=', 'embed/');

    let omdbCall = 'https://www.omdbapi.com/?apikey=e51a32ad&i=' + targetId;
    $.ajax({
      url: omdbCall,
      method: 'GET',
    }).done(function (response) {
      let ratings = response.Ratings;
      let ratingsArray = ratings.map(data => data);

      let $modalBody = $('#m-body');

      // clear previous rendering
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
      
      ratingsArray.forEach(rating => {
        $('<p></p>').text(`${rating.Source}: ${rating.Value}`).appendTo($info);
      })

      $('<iframe></iframe>', {
        'width': '100%',
        'height': '350',
        'src': videoUrl,
        'title': 'Youtube video player',
      }).appendTo($modalBody);
    });
  }) 
})
