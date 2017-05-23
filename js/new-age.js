function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyC3CmQtKZYY0TxE_hujWD5JkCoAMNS6NSw');
}

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

    $('#search-video-bar').change(function (event) {
        $('.list-group').html('');
        var request = gapi.client.youtube.search.list({
            maxResults: '25',
            part: 'snippet',
            q:$(this).val()
        });
        request.execute(function (response) {
            console.log(response);
            $('.iframe-container').html(
                '<iframe width="660" height="425" src="https://www.youtube.com/embed/'+response.items[0].id.videoId+'?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
            );
            $('#download-as-mp3').attr('data-to-download',response.items[0].id.videoId);
            response.items.forEach(function (item) {
                $('.list-group').append(
                    '<a class="list-group-item" id="'+item.id.videoId+'">'+
                        '<div>'+
                            '<img src="'+item.snippet.thumbnails.default.url+'">'+
                        '</div>'+
                        '<div class="vid-details">'+
                            '<h4 class="list-group-item-heading">'+item.snippet.title+'</h4>'+
                            '<p class="list-group-item-text">'+item.snippet.channelTitle+'</p>'+
                        '</div>'+
                    '</a>'
                );
                $('#'+item.id.videoId).click(function (event) {
                    $(this).addClass('active');
                    $('#download-as-mp3').attr('data-to-download',item.id.videoId);
                    $('.iframe-container').html(
                        '<iframe width="660" height="425" src="https://www.youtube.com/embed/'+item.id.videoId+'?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
                    );
                    $('.list-group-item').each(function (index) {
                        if($(this).attr('id') !== item.id.videoId){
                            $(this).removeClass('active');
                        }
                    });
                });
            });
        });
    });

    $('#download-as-mp3').click(function (event) {
        $('.download-sound').show();
        $('#download-now').attr('href','http://www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v='+$(this).attr('data-to-download'));
    });

})(jQuery); // End of use strict
