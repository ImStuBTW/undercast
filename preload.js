__myAPI = {
    playpause: function() {
        if(document.getElementById("playpausebutton_playicon").style.display === 'block') {
            document.getElementById("audioplayer").play();
        }
        else {
            document.getElementById("audioplayer").pause();
        }
    },
    stop: function() {
        if(document.getElementById("playpausebutton_playicon").style.display !== 'block') {
            document.getElementById("audioplayer").pause();
        }
    },
    next: function() {
        document.getElementById("audioplayer").currentTime += parseInt(document.getElementById('seekforwardbutton').getAttribute('data-seek-forward-interval'));
    },
    previous: function() {
        document.getElementById("audioplayer").currentTime -= parseInt(document.getElementById('seekbackbutton').getAttribute('data-seek-back-interval'));
    },
    scrollPlayer: function() {
        var node = document.getElementById("progressbar");
        var padding = parseInt(window.getComputedStyle(document.getElementById('progressbar'), null).getPropertyValue('margin-top'),10);

        document.getElementById("progressbar").scrollIntoView(true);

        var scrolledY = window.scrollY;

        if(scrolledY){
          window.scroll(0, scrolledY - padding);
        }
    },
    scrollList: function() {
        var node = document.getElementsByClassName('ocseparatorbar')[0];
        var padding = parseInt(window.getComputedStyle(document.getElementsByClassName('ocseparatorbar')[0], null).getPropertyValue('margin-top'),10)/2;

        document.getElementsByClassName('ocseparatorbar')[0].scrollIntoView(true);

        var scrolledY = window.scrollY;

        if(scrolledY){
          window.scroll(0, scrolledY - padding);
        }
    }
}
