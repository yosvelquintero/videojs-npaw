/*! videojs-npaw - v0.0.0 - 2015-7-10
 * Copyright (c) 2015 Yosvel Quintero Arguelles
 * Licensed under the Apache-2.0 license. */
(function(window, videojs, qunit) {
    'use strict';

    var realIsHtmlSupported,
        player,

        // local QUnit aliases
        // http://api.qunitjs.com/

        // module(name, {[setup][ ,teardown]})
        module = qunit.module,
        // test(name, callback)
        test = qunit.test,
        // ok(value, [message])
        ok = qunit.ok,
        // equal(actual, expected, [message])
        equal = qunit.equal,
        // strictEqual(actual, expected, [message])
        strictEqual = qunit.strictEqual,
        // deepEqual(actual, expected, [message])
        deepEqual = qunit.deepEqual,
        // notEqual(actual, expected, [message])
        notEqual = qunit.notEqual,
        // throws(block, [expected], [message])
        throws = qunit.throws;

    module('videojs-npaw', {
        setup: function() {
            // force HTML support so the tests run in a reasonable
            // environment under phantomjs
            realIsHtmlSupported = videojs.Html5.isSupported;
            videojs.Html5.isSupported = function() {
                return true;
            };

            // create a video element
            var video = document.createElement('video');
            document.querySelector('#qunit-fixture').appendChild(video);

            // create a video.js player
            player = videojs(video);

            // initialize the plugin with the default options
            player.npaw();
        },
        teardown: function() {
            videojs.Html5.isSupported = realIsHtmlSupported;
        }
    });

    test('registers itself', function() {
        ok(player.npaw, 'registered the videojs-npaw');
    });

    test('require to trigger the event firstplay to create ul#notification and li elements', function() {
        player.npaw();

        equal(
            player.el().querySelector('ul#notification'),
            null,
            'ul#notification is not present'
        );
        equal(
            player.el().querySelector('li#li_play'),
            null,
            'li#li_play is not present'
        );
        equal(
            player.el().querySelector('li#li_pause'),
            null,
            'li#li_pause is not present'
        );
        equal(
            player.el().querySelector('li#li_elapsed_time'),
            null,
            'li#li_elapsed_time is not present'
        );
        equal(
            player.el().querySelector('li#li_ended'),
            null,
            'li#li_ended is not present'
        );
    });

    test('create ul#notification and li elements after the event firstplay has been triggered', function() {
        player.npaw();
        player.trigger('firstplay');

        ok(
            player.el().querySelector('ul#notification'),
            'ul#notification present'
        );
        ok(
            player.el().querySelector('li#li_play'),
            'li#li_play present'
        );
        ok(
            player.el().querySelector('li#li_pause'),
            'li#li_pause present'
        );
        ok(
            player.el().querySelector('li#li_elapsed_time'),
            'li#li_elapsed_time present'
        );
        ok(
            player.el().querySelector('li#li_ended'),
            'li#li_ended present'
        );
    });

    test('when the event play is triggered at first time', function() {
        var inner_html_play = 'Play 1.';

        player.npaw();
        player.trigger('play');

        strictEqual(
            player.el().querySelector('li#li_play').innerHTML,
            inner_html_play,
            'li#li_play inner html is strictEqual to: ' + inner_html_play
        );
    });

    test('when the event pause is triggered at first time', function() {
        var inner_html_pause = 'Pause 1.';

        player.npaw();

        player.trigger('play');
        player.trigger('pause');

        strictEqual(
            player.el().querySelector('li#li_pause').innerHTML,
            inner_html_pause,
            'li#li_pause inner html is strictEqual to: ' + inner_html_pause
        );
    });

    test('when the event play is triggered at second time', function() {
        var inner_html_play = 'Play 2.',
            inner_html_pause = 'Pause 1.',
            inner_html_elapsed_time = 'Elapsed time between pause/resume 0s.';

        player.npaw();

        player.trigger('play');
        player.trigger('pause');
        player.trigger('play');

        strictEqual(
            player.el().querySelector('li#li_play').innerHTML,
            inner_html_play,
            'li#li_play inner html is strictEqual to: ' + inner_html_play
        );
        strictEqual(
            player.el().querySelector('li#li_pause').innerHTML,
            inner_html_pause,
            'li#li_pause inner html is strictEqual to: ' + inner_html_pause
        );
        strictEqual(
            player.el().querySelector('li#li_elapsed_time').innerHTML,
            inner_html_elapsed_time,
            'li#li_elapsed_time inner html is strictEqual to: ' + inner_html_elapsed_time
        );
    });

    test('when the event play is triggered at second time with a delay of 2 seconds', function() {
        var inner_html_play = 'Play 2.',
            inner_html_pause = 'Pause 1.',
            inner_html_elapsed_time = 'Elapsed time between pause/resume 2s.';

        player.npaw();
        player.trigger('play');
        player.trigger('pause');

        // Stop JavaSript execution to get 2 seconds..
        (function(miliseconds) {
            var currentTime = new Date().getTime();

            while (currentTime + miliseconds >= new Date().getTime()) {}
        })(2000);
        player.trigger('play');

        strictEqual(
            player.el().querySelector('li#li_play').innerHTML,
            inner_html_play,
            'li#li_play inner html is strictEqual to: ' + inner_html_play
        );
        strictEqual(
            player.el().querySelector('li#li_pause').innerHTML,
            inner_html_pause,
            'li#li_pause inner html is strictEqual to: ' + inner_html_pause
        );
        strictEqual(
            player.el().querySelector('li#li_elapsed_time').innerHTML,
            inner_html_elapsed_time,
            'li#li_elapsed_time inner html is strictEqual to: ' + inner_html_elapsed_time
        );
    });

    test('when the event ended is triggered', function() {
        var inner_html_ended = 'Video ended.';

        player.npaw();

        player.trigger('play');
        player.trigger('ended');

        strictEqual(
            player.el().querySelector('li#li_ended').innerHTML,
            inner_html_ended,
            'li#li_ended inner html is strictEqual to: ' + inner_html_ended
        );
    });

})(window, window.videojs, window.QUnit);
