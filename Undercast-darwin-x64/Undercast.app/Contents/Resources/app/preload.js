// Preload.js functions are garbage collected.
// Putting them in a single __myAPI object allows them to be injected into overcast.fm's page.
// The double underscores are to ensure that there isn't a namespace collision.
__myAPI = {
    // Play / Pause the Audio. Reads the display state of the play button to determine if audio is playing.
    playpause: function() {
        if(document.getElementById("playpausebutton_playicon").style.display === 'block') {
            document.getElementById("audioplayer").play();
        }
        else {
            document.getElementById("audioplayer").pause();
        }
    },
    // Stop music if it is playing.
    stop: function() {
        if(document.getElementById("playpausebutton_playicon").style.display !== 'block') {
            document.getElementById("audioplayer").pause();
        }
    },
    // Skips ahead/behind by the amount of time the user has set.
    // Skip values are read from the data attribute on the button.
    next: function() {
        document.getElementById("audioplayer").currentTime += parseInt(document.getElementById('seekforwardbutton').getAttribute('data-seek-forward-interval'));
    },
    previous: function() {
        document.getElementById("audioplayer").currentTime -= parseInt(document.getElementById('seekbackbutton').getAttribute('data-seek-back-interval'));
    },
    // Function to scroll to the top of the audio player when a podcast is displayed.
    scrollPlayer: function() {
        // Scroll to the progress bar.
        document.getElementById("progressbar").scrollIntoView(true);
        // Determine how much padding is on the progress bar.
        var padding = parseInt(window.getComputedStyle(document.getElementById('progressbar'), null).getPropertyValue('margin-top'),10);
        // Determine the scroll bar's Y value on the page.
        var scrolledY = window.scrollY;
        // Scroll to the top of the padding.
        window.scroll(0, scrolledY - padding);

    },
    // Ditto, but for lists.
    scrollList: function() {
        document.getElementsByClassName('ocseparatorbar')[0].scrollIntoView(true);
        var padding = parseInt(window.getComputedStyle(document.getElementsByClassName('ocseparatorbar')[0], null).getPropertyValue('margin-top'),10)/2;
        var scrolledY = window.scrollY;
        window.scroll(0, scrolledY - padding);
    }
}
