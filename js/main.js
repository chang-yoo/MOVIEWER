function comingMovie() {
  var $ul = document.querySelector('.list');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_4003h2lv');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var items = xhr.response.items;
    for (var i = 0; i < items.length; i++) {
      var description = movieDescription(items[i]);
      $ul.append(description);
    }
  });
  xhr.send();
}

window.addEventListener('load', comingMovie);

function movieDescription(object) {
  var $li = document.createElement('li');

  var $briefCon = document.createElement('div');
  $briefCon.setAttribute('class', 'brief-container');
  $li.append($briefCon);

  var $briefImg = document.createElement('div');
  $briefImg.setAttribute('class', 'image-container');
  $briefCon.appendChild($briefImg);

  var $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.setAttribute('class', 'brief-image');
  $briefImg.appendChild($img);

  var $briefDesc = document.createElement('div');
  $briefDesc.setAttribute('class', 'brief-description text-align-center');
  $briefCon.append($briefDesc);

  var $anchor = document.createElement('a');
  $anchor.setAttribute('href', '#');
  $anchor.setAttribute('class', 'brief-text-box');
  $briefDesc.append($anchor);

  var $title = document.createElement('p');
  $title.setAttribute('data-id', object.id);
  $title.setAttribute('class', 'brief-title');
  $title.textContent = object.title;
  $anchor.append($title);

  var $year = document.createElement('h6');
  $year.setAttribute('data-id', object.id);
  $year.setAttribute('class', 'brief-year');
  $year.textContent = object.year;
  $anchor.append($year);

  var $deleteBox = document.createElement('div');
  $deleteBox.setAttribute('class', 'delete-button hidden');
  $briefDesc.append($deleteBox);

  var $delete = document.createElement('a');
  $delete.setAttribute('class', 'delete');
  $delete.textContent = 'Delete';
  $deleteBox.append($delete);

  return $li;
}

function detailsMovie(object) {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row details');

  var $detailImgCont = document.createElement('div');
  $detailImgCont.setAttribute('class', 'detailed-image-container column-one-third');
  $row.append($detailImgCont);

  var $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.setAttribute('class', 'detailed-image column-half');
  $detailImgCont.append($img);

  var $detailedText = document.createElement('div');
  $detailedText.setAttribute('class', 'column-half detailed-text');
  $row.append($detailedText);

  var $descriptionBox = document.createElement('div');
  $descriptionBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($descriptionBox);

  var $desciptionText = document.createElement('div');
  $desciptionText.setAttribute('class', 'description-box');
  $descriptionBox.append($desciptionText);

  var $descriptionTitle = document.createElement('h4');
  $descriptionTitle.textContent = 'Title: ' + object.title;
  $desciptionText.append($descriptionTitle);

  var $descriptionReleaseDate = document.createElement('h4');
  $descriptionReleaseDate.textContent = 'Release Date: ' + object.releaseState;
  $desciptionText.append($descriptionReleaseDate);

  var $descriptionRunningTime = document.createElement('h4');
  $descriptionRunningTime.textContent = 'Running Time in Minutes: ' + object.runtimeMins + ' mins';
  $desciptionText.append($descriptionRunningTime);

  var $descriptionGenre = document.createElement('h4');
  $descriptionGenre.textContent = 'Genre: ' + object.genres;
  $desciptionText.append($descriptionGenre);

  var $descriptionDirector = document.createElement('h4');
  $descriptionDirector.textContent = 'Director: ' + object.directors;
  $desciptionText.append($descriptionDirector);

  var $descriptionStars = document.createElement('h4');
  $descriptionStars.textContent = 'Stars: ' + object.stars;
  $desciptionText.append($descriptionStars);

  var $plotBox = document.createElement('div');
  $plotBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($plotBox);

  var $descriptionPlot = document.createElement('div');
  $descriptionPlot.setAttribute('class', 'description-box');
  $plotBox.append($descriptionPlot);

  var $plotText = document.createElement('h4');
  $plotText.textContent = 'BRIEF PLOT';
  $descriptionPlot.append($plotText);

  var $plot = document.createElement('h4');
  $plot.textContent = object.plot;
  $descriptionPlot.append($plot);

  return $row;
}

function hideList() {
  var $listBox = document.querySelector('.list-box');
  $listBox.className = 'list-box hidden';
  var $details = document.querySelector('.detail-container');
  $details.setAttribute('class', 'column-full detail-container');
  var $listContainer = document.querySelector('.list-container');
  var $watchList = document.querySelector('.watch-list-container');
  $listContainer.className = 'list-container column-full';
  $watchList.setAttribute('class', 'watch-list-container column-full hidden');
}

function viewWatchList(event) {
  var $watchList = document.querySelector('.watch-list-container');
  $watchList.className = 'watch-list-container column-full';
}

function hideWatchList(event) {
  var $listContainer = document.querySelector('.list-container');
  var $watchList = document.querySelector('.watch-list-container');
  $listContainer.className = 'list-container column-full';
  $watchList.setAttribute('class', 'watch-list-container column-full hidden');
}

var $ul = document.querySelector('.list');

$ul.addEventListener('click', getDetails);

function getDetails(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_4003h2lv');
  xhr.responseType = 'json';
  if (event.target.tagName === 'P') {
    var text = event.target.closest('p');
    var $textIds = text.getAttribute('data-id');
    var stringId = String($textIds);
  } else {
    showList();
  }
  hideList();
  xhr.addEventListener('load', function (event) {
    var items = xhr.response.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === stringId) {
        var singleMovie = items[i];
        var descriptionOfSingleMovie = detailsMovie(singleMovie);
        var $detailContainer = document.querySelector('.detail-container');
        $detailContainer.append(descriptionOfSingleMovie);
      }
    }
  });
  xhr.send();
}

var $homeBtn = document.querySelector('.red-background');
$homeBtn.addEventListener('click', showList);

function showList() {
  var $listBox = document.querySelector('.list-box');
  $listBox.className = 'list-box';
  var $details = document.querySelector('.detail-container');
  $details.className = 'hidden detail-container full-column';
  hideWatchList();
  $details.removeChild($details.lastElementChild);
  var $deleteBtn = document.querySelectorAll('.delete-button');
  for (var q = 0; q < $deleteBtn.length; q++) {
    $deleteBtn[q].className = 'hidden delete-button';
  }
}

var $addToList = document.querySelector('.add-to-list');

$addToList.addEventListener('click', function addToWatchList(event) {
  var $img = document.querySelector('.detailed-image');
  var $imgValue = $img.getAttribute('src');
  var $title = document.querySelector('.detailed-title');
  var $year = document.querySelector('.detailed-year');
  var $id = $title.getAttribute('data-id');
  var datas = {
    image: $imgValue,
    title: $title.textContent,
    year: $year.textContent,
    id: String($id)
  };
  data.movie.push(datas);
  var addToWatchList = movieDescription(datas);
  var $ul = document.querySelector('.watch-list');
  $ul.append(addToWatchList);
  $addingPopUp.className = 'adding-btn-popup-container column-full';
});

var $addingPopUp = document.querySelector('.adding-btn-popup-container');
var $popUpPerfectBtn = document.querySelector('.popup-confirm-btn');
$popUpPerfectBtn.addEventListener('click', popUpRemove);

function popUpRemove(event) {
  $addingPopUp.className = 'hidden adding-btn-popup-container column-full';
}

var $watchListBtn = document.querySelector('.yellow-background');

$watchListBtn.addEventListener('click', watchList);

function watchList(event) {
  hideList();
  var $deleteBtn = document.querySelectorAll('.delete-button');
  for (var q = 0; q < $deleteBtn.length; q++) {
    $deleteBtn[q].className = 'delete-button';
  }
  var details = document.querySelector('.detail-container');
  details.className = 'column-full detail-container hidden';
  viewWatchList();
  var movies = data.movie;
  var $watchListText = document.querySelector('.watch-list-text');
  for (var i = 0; i < movies.length; i++) {
    if (movies[i] === 0) {
      $watchListText.className = 'watch-list-text';
    } else {
      $watchListText.className = 'watch-list-text hidden';
    }
  }
}

window.addEventListener('DOMContentLoaded', loadWatchList);
function loadWatchList(event) {
  var movies = data.movie;
  var $ul = document.querySelector('.watch-list');
  for (var i = 0; i < movies.length; i++) {
    var selectedMovie = movieDescription(movies[i]);
    $ul.prepend(selectedMovie);
  }
}
