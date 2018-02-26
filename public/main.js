$(document).ready(function () {

  var socket = io();

  $('#show_stock').click(function () {
    socket.broadcast.emit('added stock');
  });

  socket.on('update', function () {
      $.ajax({
        url: '/',
        type: 'get',
        success: function (result) {
          console.log('chart updated');
        },
        error: function () {
          alert('Cannot find stocks');
        }
      });

  });

  // $('.glyphicon').click(function decreaseGoing() {
  //
  //   let id = this.id;
  //   $.ajax({
  //     url: '/remove/' + id,
  //     type: 'POST',
  //     success: function (result) {
  //       console.log('Item deleted');
  //     },
  //     error: function () {
  //       alert('Cannot delete stock.');
  //     }
  //   });
  //
  // })

});
