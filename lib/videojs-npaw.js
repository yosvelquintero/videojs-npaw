/*! videojs-npaw - v0.0.0 - 2015-7-10
 * Copyright (c) 2015 Yosvel Quintero Arguelles
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
    'use strict';

    var defaults = {
            option: true
        },
        npaw;

    /**
     * Initialize the plugin.
     * @param options (optional) {object} configuration for the plugin
     */
    npaw = function(options) {
        var settings = videojs.util.mergeOptions(defaults, options),
            player = this;

        // TODO: write some amazing plugin code
    };

    // register the plugin
    videojs.plugin('npaw', npaw);
})(window, window.videojs);
