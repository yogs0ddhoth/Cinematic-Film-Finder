$('#search-form').on('click', 'button', function(event) {
  console.log('test');
  event.preventDefault();
  let imdbSearchMovie = {
    "url": "https://imdb-api.com/en/API/AdvancedSearch/k_5yme52ms",
    "method": "GET",
    "timeout": 0,
  };
  let q = $('#search-input').val();
  console.log(q);
  let qParam = '?title=' + q + '&title_type=feature,tv_movie,documentary';
  imdbSearchMovie.url += qParam;
  console.log(imdbSearchMovie);
  
  // $.ajax(imdbSearchMovie).done(function (response) {
  //   let responseArray = response.results;
  //   console.log(responseArray);
    
  //   // set response to local storage so that rendering functionality can be tested without using limited api calls
  //   localStorage.setItem(q, JSON.stringify(responseArray));
    
  //   //  Run through a for loop for rendering:
  //   for (i = 0; i < 30; i++) {
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
  //   }
  // });
  
  
  // rendering functionality using local storage - for testing purposes
  let responseArray = JSON.parse(localStorage.getItem(q));
  //  Run through a for loop for rendering:
  for (i = 0; i < 30; i++) {
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
    }).appendTo($col);
    $('<img>', {
      'src': imdbImage.replace('original', '192x264'),
      'class': 'card-img-top',
      'alt': imdbTitle,
    }).appendTo($card);
    $('<h2></h2>').text(imdbTitle + ' ' + imdbDescrp).appendTo($card);
  }
})


// params:
// genre

// returned and rendered information:
//  from: OMDBI - Rotten Tomatoes score
//  

$('#results').on('click', $('.card'), function(event) {
  console.log('test');
  event.preventDefault();
  let target = event.target;
  let targetEl = target.closest('div[id]');
  console.log(targetEl);
  let targetId = targetEl.attr("id");
  console.log(targetId);
  if (targetId == 'results') {
    return;
  } else {
    console.log('it worked!');
  }
})