__myAPI = {
    playpause: function() {
        if(document.getElementById("playpausebutton_playicon").style.display === 'block') {
            document.getElementById("audioplayer").play();
        }
        else {
            document.getElementById("audioplayer").pause();
        }
    }
}
