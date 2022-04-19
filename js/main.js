var $ul = document.querySelector('ul');

function comingMovie() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/ComingSoon/k_4003h2lv');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (event) {
    var items = xhr.response.items;
    for (var i = 0; i < items.length; i++) {
      var $li = document.createElement('li');

      var $briefCon = document.createElement('div');
      $briefCon.setAttribute('class', 'brief-container');
      $li.append($briefCon);

      var $briefImg = document.createElement('div');
      $briefImg.setAttribute('class', 'brief-image');
      $briefCon.appendChild($briefImg);

      var $img = document.createElement('img');
      $img.setAttribute('src', items[i].image);
      $briefImg.appendChild($img);

      var $briefDesc = document.createElement('div');
      $briefDesc.setAttribute('class', 'brief-description text-align-center');
      $briefCon.append($briefDesc);

      var $title = document.createElement('p');
      $title.textContent = items[i].title;
      $briefDesc.append($title);

      var $year = document.createElement('p');
      $year.textContent = items[i].year;
      $briefDesc.append($year);

      $ul.append($li);
    }
  });
  xhr.send();
}

comingMovie();
