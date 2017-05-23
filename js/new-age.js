(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    });

    $('.downloading').hide();
    $('.search-results').hide();
    $('.download-sound').hide();
    $('.download-now-container').show();

    $('#start-for-free').click(function (event) {
        $('.download-sound').show();
        $('#download-now').attr('href','http://www.youtubeinmp3.com/fetch/?video='+$('#youtube-url').val());
    });

    $('#search-video').click(function (event) {
        $('.search-results').show();
    });

    $('#download-now').click(function (event) {
        $('.downloading').show();
        $('.download-now-container').hide();
    });

})(jQuery); // End of use strict
