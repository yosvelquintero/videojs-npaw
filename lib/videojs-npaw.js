/*! videojs-npaw - v0.0.0 - 2015-7-10
 * Copyright (c) 2015 Yosvel Quintero Arguelles
 * Licensed under the Apache-2.0 license. */
(function(window, document, videojs) {
    'use strict';

    var defaults = {
            option: true,
            apiUrl: 'http://project.dev/videojs-npaw/api/',
            textNotification : {
                play: 'Play',
                pause: ' Pause',
                ended: 'Video ended',
                elapsedTime: 'Elapsed time between pause/resume',
                seconds: 's',
                space: ' ',
                dot: '.'
            }
        },
        npaw;

    /**
     * Initialize the plugin.
     * @param options (optional) {object} configuration for the plugin
     */
    npaw = function(options) {
        var settings = videojs.util.mergeOptions(defaults, options),
            player = this;

        console.log(settings);

        // Event fisrtplay
        player.one('firstplay', function () {
            // body...
        });

        // Event play
        player.on('play', function () {
            // body...
        });

        // Event pause
        player.on('pause', function () {
            // body...
        });

        // Event ended
        player.on('ended', function () {
            // body...
        });
    };

    // register the plugin
    videojs.plugin('npaw', npaw);
})(window, window.document, window.videojs);
