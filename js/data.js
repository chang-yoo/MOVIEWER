/* exported data */
var data = {
  movie: [],
  editing: null
};

window.addEventListener('beforeunload', function storage(event) {
  var JSONData = JSON.stringify(data);
  localStorage.setItem('storage', JSONData);
});

var dataFromJSON = localStorage.getItem('storage');
if (dataFromJSON !== null) {
  data = JSON.parse(localStorage.getItem('storage'));
}
