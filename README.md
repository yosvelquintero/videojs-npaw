# Video.js Npaw

Analytics plugin for video.js

## Getting Started

Once you've added the plugin script to your page, you can use it with any video:

```html
<script src="video.js"></script>
<script src="videojs-npaw.js"></script>
<script>
    videojs(document.querySelector('video')).npaw();
</script>
```

There's also a [working example](example.html) of the plugin you can check out if you're having trouble. You should
upload  the files to your host and the API requires PHP installed.

## Documentation
### Plugin Options

You may pass in an options object to the plugin upon initialization. This
object may contain any of the following properties:

#### api
Type: `string`
Default: 'http://project.dev/videojs-npaw/api/'

The API url wish is consumed when the video starts (first play only), every time the user resume the content, and
also when the video is finished.

Always is sended to the API parameters like `event` and the video `current_src`, but when the event is play we also send
the parameter `elapsed_time`.

#### tn
Type: `object`
Default: {
    play: 'Play',
    pause: 'Pause',
    ended: 'Video ended',
    elapsedTime: 'Elapsed time between pause/resume',
    seconds: 's',
    space: ' ',
    dot: '.'
}

The default text notifications.

### Default css styles

```html
  <style>
    ul#notification {
        position: absolute;
        background-color: #646464;
        /* IE8 fallback */
        background-color: rgba(255, 255, 255, 0.4);
        color: #fff;
        padding: 5px 10px;
        border-radius: 3px;
        top: 5px;
        left: 10px;
        text-align: left;
    }
    ul#notification li {
        list-style: none;
        display: inline;
        padding-left: 2px;
    }
</style>
```

## Release History

 - 0.1.0: Initial release
