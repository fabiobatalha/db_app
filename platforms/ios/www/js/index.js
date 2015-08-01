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
    },
};

app.initialize();

var my_media = null;
var mediaTimer = null;
var index = 0;
var playlist = new Array(
    {
        "file": "audio/howlong.mp3",
        "title": "How Long"
    },
    {
        "file": "audio/rota145.mp3",
        "title": "Rota 145"
    },
    {
        "file": "audio/natrilhadoblues.mp3",
        "title": "Na Trilha do Blues"
    },
    {
        "file": "audio/devassa.mp3",
        "title": "Devassa"
    }
)

function playAudio() {

    if (my_media == null) {
        my_media = new Media(playlist[index].file);
        $('#media_title').text(playlist[index].title);
    }
    my_media.play();
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition(position);
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 100);
    }
};

function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
};

function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
};

function releaseAudio() {
    if (my_media) {
        my_media.release();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
};

function onSuccess() {
    console.log("playAudio():Audio Success");
};

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

function getMinutes(value){
    value = Math.ceil(value); 
    if (value > 0) {
        var minutes = "" + Math.floor(value / 60);
        var seconds = "0" + (value - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2); 
    }
    return "0:00";
}

function setAudioPosition(position) {
    $('#audio_position').text(getMinutes(position));
    $('#audio_time').text(getMinutes(my_media.getDuration()));
    $('#progress_bar').attr("value", position);
    $('#progress_bar').attr("max", my_media.getDuration());
};

function previousAudio() {
    var previous = index - 1;
    if (previous >= 0) {
        index = previous;
        stopAudio();
        releaseAudio();
        my_media = null;
        mediaTimer = null;
        playAudio();
    }
}

function nextAudio() {
    var next = index + 1;
    if (next < playlist.length) {
        index = next;
        stopAudio();
        releaseAudio();
        my_media = null;
        mediaTimer = null;
        playAudio();
    }
}

function playByIndex(ndx) {
    if (ndx < playlist.length && ndx >=0) {
        index = ndx;
        stopAudio();
        releaseAudio();
        my_media = null;
        mediaTimer = null;
        playAudio();
    }
}