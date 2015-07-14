/*! videojs-npaw - v0.0.0 - 2015-7-10
 * Copyright (c) 2015 Yosvel Quintero Arguelles
 * Licensed under the Apache-2.0 license. */
(function(window, document, videojs) {
    'use strict';

    var defaults = {
            api: 'http://project.dev/videojs-npaw/api/',

            // Text notifications
            tn: {
                play: 'Play',
                pause: 'Pause',
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

            // Defaults Counters
            counter = {
                'pause': 0,
                'play': 0
            },

            // Defaults Timers
            timer = {
                'starter': 0,
                'total': 0,
            },

            // Data from the video
            current_src = this.currentSrc(),

            /**
             * createElementLi         Create DOM li element
             *
             * @param  {string} str Element id
             * @return {object}     DOM li element
             */
            createElementLi = function(str) {
                var li = document.createElement('li');
                li.setAttribute('id', str);
                return li;
            },

            /**
             * getElementLi         Get DOM Li element by id
             *
             * @param  {string} str Element id
             * @return {object}     DOM li element
             */
            getElementLi = function(str) {
                return document.getElementById(str);
            },

            /**
             * httpGet                     Method to handle http get calls
             *
             * @param  {string}   url      Api url
             * @param  {Function} callback Method to handle the response
             *
             * @return {void}              Handle http get calls
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
             * getSerializedUrl     Encode an object valid to send in urls
             *
             * @param  {object} obj Object to serialize
             *
             * @return {string}     Serialized object
             */
            getSerializedUrl = function(obj) {
                var str = [];
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                }

                return settings.api + '?' + str.join('&');
            },

            /**
             * getElapsedTime    Get elapsed time
             *
             * @return {integer} Number of the total time in seconds
             */
            getElapsedTime = function() {
                timer.end = new Date();
                timer.diff = timer.end - timer.starter;

                // Strip the ms
                timer.diff /= 1000;

                // Total time in seconds
                timer.total += Math.round(timer.diff % 60);
                return timer.total;
            },

            /**
             * elapsedTimeAction Create content with the elapsed time
             *
             * @return {void}    DOM element manipulation|Implements http get call
             */
            elapsedTimeAction = function(current_src) {
                var elapsed_time = getElapsedTime(),
                    object_url = {
                        'event': 'play',
                        'current_src': current_src,
                        'elapsed_time': elapsed_time
                    };

                getElementLi('li_elapsed_time')
                    .innerHTML = settings.tn.elapsedTime + settings.tn.space + elapsed_time + settings.tn.seconds + settings.tn.dot;

                // HTTP GET Request
                httpGet(getSerializedUrl(object_url), function(data) {
                    // console.log('Play. Do something with response: ', data);
                });
            },

            /**
             * firstplayAction Video first action
             *
             * @return {void}  Create/Manipulate DOM elements|Implements http get call
             */
            firstplayAction = function() {
                var current_src = encodeURIComponent(this.currentSrc()),
                    object_url = {
                        'event': 'firstplay',
                        'current_src': current_src
                    },
                    ul = this.createEl('ul', {
                        'id': 'notification'
                    }),
                    liElements = [
                        createElementLi('li_play'),
                        createElementLi('li_pause'),
                        createElementLi('li_elapsed_time'),
                        createElementLi('li_ended')
                    ],
                    i = 0,
                    length = liElements.length;

                for (i = 0; i < length; i++) {
                    ul.appendChild(liElements[i]);
                }

                this.el().appendChild(ul);

                // HTTP GET Request
                httpGet(getSerializedUrl(object_url), function(data) {
                    // console.log('Firstplay. Do something with response: ', data);
                });
            },

            /**
             * playAction      Video play action
             *
             * @return {void}  DOM element manipulation|Hhandle elapsed time
             */
            playAction = function() {
                var current_src = encodeURIComponent(this.currentSrc());

                getElementLi('li_play').innerHTML = settings.tn.play + settings.tn.space + (++counter.play) + settings.tn.dot;

                if (1 < counter.play) {
                    elapsedTimeAction(current_src);
                }
            },

            /**
             * pauseAction     Video pause action
             *
             * @return {void}  DOM element manipulation|Sets time starter
             */
            pauseAction = function() {
                timer.starter = new Date();
                getElementLi('li_pause').innerHTML = settings.tn.pause + settings.tn.space + (++counter.pause) + settings.tn.dot;
            },

            /**
             * endedAction    Video ended action
             *
             * @return {void} DOM element manipulation|Implements http get call
             */
            endedAction = function() {
                var current_src = encodeURIComponent(this.currentSrc()),
                    object_url = {
                        'event': 'ended',
                        'current_src': current_src
                    };

                getElementLi('li_ended').innerHTML = settings.tn.ended + settings.tn.dot;


                // HTTP GET Request
                httpGet(getSerializedUrl(object_url), function(data) {
                    // console.log('Ended. Do something with response: ', data);
                });
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
