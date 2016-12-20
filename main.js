$(document).ready(function(){
  let direction ="up";
  $("#changedirection").click(function(){
    if(direction ==="up") direction = "down";
    else direction = "up";
    console.log(direction);
    $("ul").unbind().removeData()
        .find("li").unbind().removeData()
        .end().myPlugin( {direction: direction, index: 0, debug: false} );
  });
  $("#dnd").click(function(){
    console.log("q");
    $("li").draggable();
    $("ul").unbind().removeData();
  });
    $("ul").myPlugin( {direction: direction, index: 0, debug: false} );
});
