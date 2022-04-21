function comingMovie() {
  var $ul = document.querySelector('ul');
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
  $briefDesc.append($anchor);

  var $title = document.createElement('p');
  $title.setAttribute('data-id', object.id);
  $title.textContent = object.title;
  $anchor.append($title);

  var $year = document.createElement('p');
  $year.setAttribute('data-id', object.id);
  $year.textContent = object.year;
  $anchor.append($year);
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
  $detailImgCont.append($img);

  var $detailedText = document.createElement('div');
  $detailedText.setAttribute('class', 'column-half detailed-text');
  $row.append($detailedText);

  var $descriptionBox = document.createElement('div');
  $descriptionBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($descriptionBox);

  var $descriptionTitle = document.createElement('h4');
  $descriptionTitle.textContent = 'Title: ' + object.title;
  $descriptionBox.append($descriptionTitle);

  var $descriptionReleaseDate = document.createElement('h4');
  $descriptionReleaseDate.textContent = 'Release Date: ' + object.releaseState;
  $descriptionBox.append($descriptionReleaseDate);

  var $descriptionRunningTime = document.createElement('h4');
  $descriptionRunningTime.textContent = 'Running Time in Minutes: ' + object.runtimeMins + ' mins';
  $descriptionBox.append($descriptionRunningTime);

  var $descriptionGenre = document.createElement('h4');
  $descriptionGenre.textContent = 'Genre: ' + object.genres;
  $descriptionBox.append($descriptionGenre);

  var $descriptionDirector = document.createElement('h4');
  $descriptionDirector.textContent = 'Director: ' + object.directors;
  $descriptionBox.append($descriptionDirector);

  var $descriptionStars = document.createElement('h4');
  $descriptionStars.textContent = 'Stars: ' + object.stars;
  $descriptionBox.append($descriptionStars);

  var $plotBox = document.createElement('div');
  $plotBox.setAttribute('class', 'detailed-box text-align-center');
  $detailedText.append($plotBox);

  var $plotText = document.createElement('h4');
  $plotText.textContent = 'BRIEF PLOT';
  $plotBox.append($plotText);

  var $plot = document.createElement('h4');
  $plot.textContent = object.plot;
  $plotBox.append($plot);

  return $row;
}

function hideList() {
  var $listText = document.querySelector('.list-text');
  var $listContainer = document.querySelector('.list-container');
  $listText.setAttribute('class', 'list-text text-align-center hidden');
  $listContainer.setAttribute('class', 'list-container column-full hidden');
  var $details = document.querySelector('.margin-0');
  $details.setAttribute('class', 'column-full margin-0');
}

function showList() {
  var $listText = document.querySelector('.list-text');
  var $listContainer = document.querySelector('.list-container');
  $listText.setAttribute('class', 'list-text text-align-center');
  $listContainer.setAttribute('class', 'list-container column-full');
  var $details = document.querySelector('.margin-0');
  var $row = document.querySelector('.details');
  $details.setAttribute('class', 'column-full margin-0 hidden');
  $details.removeChild($row);
}

var $ul = document.querySelector('ul');

$ul.addEventListener('click', getDetails);

function getDetails(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_4003h2lv');
  xhr.responseType = 'json';
  if (event.target.tagName === 'P') {
    var text = event.target.closest('p');
    var $textIds = text.getAttribute('data-id');
    var stringId = String($textIds);
  }
  hideList();
  xhr.addEventListener('load', function (event) {
    var items = xhr.response.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === stringId) {
        var singleMovie = items[i];
        var descriptionOfSingleMovie = detailsMovie(singleMovie);
        var $detailContainer = document.querySelector('.margin-0');
        $detailContainer.append(descriptionOfSingleMovie);
      }
    }
  });
  xhr.send();
}

var $homeBtn = document.querySelector('.header-home');
$homeBtn.addEventListener('click', showList);
