(function() {
  //references to dom
  var btnEnter = $('#btn-enter');
  var btnLeave = $("#btn-leave");
  var imgLoading = $("#status img");
  
  //start the socket listener
  var socket = new io.Socket("localhost", {port: 3001});
  socket.on('message', function(obj){
    console.log("Message: ", obj);
  });
  
  
  //apply interface interaction
  btnEnter.click(function(evt) {
    socket.connect(); //connect to the queue system
    
    if(!imgLoading.hasClass('on')) {
      imgLoading.addClass('on');
    }
    
  });
  
  
  
  btnLeave.click(function(evt) {
    
    socket.disconnect();
    
    imgLoading.removeClass('on');
    console.log("disconnected.");
  });
  
  
  

})();