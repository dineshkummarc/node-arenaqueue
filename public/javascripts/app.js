(function() {
  //references to dom
  var btnEnter = $('#btn-enter');
  var btnLeave = $("#btn-leave");
  var imgLoading = $("#status img");
  
  //start the socket listener
  var socket = new io.Socket("localhost", {port: 3001});
  
  socket.on('message', function(response) {
    console.log("oh hai there from server!");
    //receive message from server
    
    
    if(response == 'onGameStart') {
      $("#main").hide('slow', function() {
        $("#game").show('fast');
        //INCEPTION1!!!!
      });
      
    }
    
    
  });
  
  //apply interface interaction
  btnEnter.click(function(evt) {
    $("#sound-prepare")[0].play();
    if(!imgLoading.hasClass('on')) {
      imgLoading.addClass('on');
    }
    socket.connect(); //connect to the queue system
  });
  
  
  
  btnLeave.click(function(evt) {
    
    socket.disconnect();
    
    imgLoading.removeClass('on');
    console.log("disconnected.");
  });
})();



/*

  socket.on('message', function(response) {
    
    console.log(response);

    if(response == 'onGameStart') {
      $("#main").hide('slow', function() {
        $("#game").show('fast');
      });
    }
  });*/
