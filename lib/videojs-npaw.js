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
            player = this,

            // Options or defaults
            api_url = options.apiUrl || settings.apiUrl,
            tn = options.textNotification || settings.textNotification,

            firstplayAction = function () {
                // body...
            },

            playAction = function () {
                // body...
            },

            pauseAction = function () {
                // body...
            },

            endedAction = function () {
                // body...
            };

        // Event fisrtplay
        player.one('firstplay', firstplayAction);

        // Event play
        player.on('play', playAction);

        // Event pause
        player.on('pause', pauseAction);

        // Event ended
        player.on('ended', endedAction);
    };

    // register the plugin
    videojs.plugin('npaw', npaw);
})(window, window.document, window.videojs);
