/*! videojs-npaw - v0.0.0 - 2015-7-10
 * Copyright (c) 2015 Yosvel Quintero Arguelles
 * Licensed under the Apache-2.0 license. */
(function(window, document, videojs) {
    'use strict';

    var defaults = {
            option: true,
            apiUrl: 'http://project.dev/videojs-npaw/api/',
            textNotification: {
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

            /**
             * setElementLi         Create DOM li element
             *
             * @param  {string} str Element id
             * @return {object}     DOM li element
             */
            setElementLi = function(str) {
                var li = document.createElement('li');
                li.setAttribute('id', str);
                return li;
            },

            /**
             * httpGet                     Method to handle HTTP GET
             *
             * @param  {string}   url      Api url
             * @param  {Function} callback Method to handle the response
             *
             * @return {void}              [description]
             */
            httpGet = function(url, callback) {
                // Works for browsers: IE7+, Firefox, Chrome, Opera, Safari
                var http = new XMLHttpRequest();

                http.onreadystatechange = function() {
                    if (http.readyState === 4 && http.status === 200) {
                        callback(http.responseText);
                    }
                };

                http.open('GET', url, true);
                http.send(null);
            },

            /**
             * firstplayAction Video first action
             *
             * @return {void}  Create/Manipulate DOM elements
             */
            firstplayAction = function() {
                var player = this,
                    ul = player.createEl('ul', {
                        'id': 'notification'
                    }),
                    liElements = [
                        setElementLi('li_play'),
                        setElementLi('li_pause'),
                        setElementLi('li_elapsed_time'),
                        setElementLi('li_ended')
                    ],
                    i = 0,
                    length = liElements.length;

                for (i = 0; i < length; i++) {
                    ul.appendChild(liElements[i]); // Note that this does NOT go to the DOM
                }

                player.el().appendChild(ul);

                // HTTP GET Request
                httpGet(api_url + '?event=firstplay', function(response) {
                    console.log('Event firstplay. Do something with response: ', response);
                });
            },

            playAction = function() {
                // body...
            },

            pauseAction = function() {
                // body...
            },

            endedAction = function() {
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
