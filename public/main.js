$(document).ready(function () {

  var socket = io();

  $('.btn-primary').click(function () {
    socket.emit('added');
  });

  socket.on('update', function () {

     $.ajax({
      url: '/',
      type: 'get',
      success: function () {
        console.log('chart updated!');
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
