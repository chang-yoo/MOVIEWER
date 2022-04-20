var $ul = document.querySelector('ul');

function comingMovie() {
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
comingMovie();

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
  $title.textContent = object.title;
  $anchor.append($title);

  var $year = document.createElement('p');
  $year.textContent = object.year;
  $anchor.append($year);

  return $li;
}
