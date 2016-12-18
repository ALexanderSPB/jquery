$(document).ready(function(){
  (function($){
    $.fn.myPlugin = function(config){
      let ulcards = $(this);
      this.click(function(event){
        let target = $(event.target);
        let index = config.index;
        let direction = config.direction;
        let targetMargin = parseInt(target.css('marginTop'));
        let targetHeight = target.outerHeight();
        let targetPosition = target.position();
        let cardsCount = ulcards[0].children.length;
        let topOffset = 0;
        let infexoffset;
        let affectedSiblings;
        if (direction === 'up') {
            let previousCards = target.prevAll();
            affectedSiblings = previousCards.slice(0, previousCards.length - index);
            affectedSiblings.each(function() {
              topOffset -= $(this).outerHeight() + targetMargin;
            });
            indexOffset = index;
            affectedSiblingsOffset = targetHeight + targetMargin;
         } else {
            let nextCards = target.nextAll();
            affectedSiblings = nextCards.slice(0, nextCards.length - index);
            affectedSiblings.each(function() {
              topOffset += $(this).outerHeight() + targetMargin;
            });
            indexOffset = cardsCount - 1 - index;
            affectedSiblingsOffset = -targetHeight - targetMargin;
          }
        target.animate({left: target.position().left + 100},200)
              .animate({top: topOffset}, 600)
              .animate({left: 0}, 600);
        affectedSiblings.animate({top: affectedSiblingsOffset}, 1000);
        function updateCardPosition(anchorElement) {
            return config.direction === 'up' ?
                this.insertBefore(anchorElement) :
                this.insertAfter(anchorElement);
        }
        $(':animated').promise().done(function() {
          updateCardPosition.call(target, ulcards[0].children[indexOffset]);
          $('li').css({top: 0, left: 0});
          if (config.debug) console.log($('li'));
        });
      });
    }
  }) (jQuery);
  let direction ="down";
  $("#changedirection").click(function(){
    if(direction ==="up") direction = "down";
    else direction = "up";
    console.log(direction);
    $("ul").unbind().removeData();
    $("ul").myPlugin( {direction: direction, index: 0, debug: false} );
  })
  let initial = $("li");
  $("#revert").click(function(){
    $("ul").empty().append(initial);
  });
  $("#dnd").click(function(){
    console.log("q");
    $("li").draggable();
    $("ul").unbind().removeData();
  });
  $("ul").myPlugin( {direction: direction, index: 0, debug: false} );
});
