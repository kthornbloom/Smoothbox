    // ------ TO DO ----------// 
    // set size based on window?
    // Animate to different sized images
    // Fix overlay to be 100% height on scroll
    // View full image button?
    // Multiple gallery groups

$(document).ready(function() {

    $('.sb').click(function(event){
        // which was clicked?
        var clicked = $(this).index('.sb');
            
        // create smoothbox
       $('body').append('<div class="smoothbox sb-load"><div class="smoothbox-table"><div class="smoothbox-centering"><div class="smoothbox-sizing"><div class="sb-nav"><a href="#" class="sb-prev">◄</a><a href="#" class="sb-cancel">✖</a><a href="#" class="sb-next">►</a></div><ul class="sb-items"></ul></div></div></div></div>');
          
        $.fn.reverse = [].reverse;
        // get each picture, put them in the box
        $('.sb').reverse().each(function() {
           var href = $(this).attr('href');
            if ($(this).attr('title')) {
                var caption = $(this).attr('title');
                $('.sb-items').append('<div class="sb-item"><div class="sb-caption">'+ caption +'</div><img src="'+ href + '"/></div>');
            }   
            else {
                  $('.sb-items').append('<div class="sb-item"><img src="'+ href + '"/></div>');
                
           }
        });
        
        $('.sb-item').slice(0,-(clicked)).appendTo('.sb-items');
        $('.sb-item').not(':last').hide();
        $('.sb-item img:last').load(function() { 
            $('.smoothbox-sizing').fadeIn('slow', function() {
                $('.sb-nav').fadeIn();
                $('.sb-load').removeClass('sb-load');
            });
        });
        event.preventDefault();
    });

    $('.sb-cancel').live('click', function() {
        $('.smoothbox').fadeOut('slow', function() {
            $('.smoothbox').remove();
        });
    });

    $('.sb-next').live('click', function() {
        // animate away
        $('.sb-item:last').addClass('sb-item-ani');
        // after animation, move order & remove class
        $('.sb-item').eq(-2).addClass('no-trans').fadeIn();
        $(".sb-item:last").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            $(this).removeClass('sb-item-ani').prependTo('.sb-items').hide();
            $('.sb-item:last').removeClass('no-trans');
            $('.sb-item').unbind();
        });    
    });

    $('.sb-prev').live('click', function() {   
        $('.sb-item:last').hide(); 
        $(".sb-item:first").addClass('sb-item-ani no-trans').appendTo('.sb-items');
        $('.sb-item:last').show().removeClass('no-trans').delay(1).queue(function(next){
            $('.sb-item:last').removeClass('sb-item-ani');
            next();
        });    
    });
});