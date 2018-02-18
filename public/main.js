$(document).ready(function () {

  $('.glyphicon').click(function decreaseGoing() {

    let id = this.id;
    $.ajax({
      url: '/remove/' + id,
      type: 'POST',
      success: function (result) {
        console.log('Item deleted');
      },
      error: function () {
        alert('Cannot delete stock.');
      }
    });

  })

});
