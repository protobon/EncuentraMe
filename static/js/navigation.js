$('#nav-list a').on('click', function (e) {
  e.preventDefault();
  $(this).tab('show');
  if ($(this).attr('href') === '#nav-mapa') {
    $('#stand_alone_map').append($('#main_map'));
  } else {
    $('#feed_map').append($('#main_map'));
  }
});
