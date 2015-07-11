var app = {
    initialize: function() {
        console.log("initialize Duca");
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        console.log("Device Ready");
        console.log("Media");
        $('#player_status').show();
        $('#player_play').children().prop('enabled',true);
        $('#player_pause').children().prop('disabled',true);
        $('#player_stop').children().prop('disabled',true);
    },
};

app.initialize();

var my_media = null;
var mediaTimer = null;
function playAudio(src){
    var my_media = new Media(src);
    my_media.play();
    $('#player_start').children().prop('disabled',true);
    $('#player_pause').children().prop('enabled',true);
    $('#player_stop').children().prop('enabled',true);
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
}

function pauseAudio() {
    if (my_media) {
        my_media.pause();
        $('#player_start').children().prop('enabled',true);
        $('#player_pause').children().prop('disabled',true);
        $('#player_stop').children().prop('enabled',true);
    }
}

function stopAudio() {
    if (my_media) {
        my_media.stop();
        $('#player_start').children().prop('enabled',true);
        $('#player_pause').children().prop('disabled',true);
        $('#player_stop').children().prop('disabled',true);
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}

function onSuccess() {
    console.log("playAudio():Audio Success");
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function setAudioPosition(position) {
    $('#audio_position').text(position);
}
