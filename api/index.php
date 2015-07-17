<?php
namespace api;

/**
 * Api
 */
class Api
{
    private $data;

    public function __construct()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

    public function setHeaderForbidden()
    {
        header('HTTP/1.0 403 Forbidden');
    }

    private function getDataFromUrl($str)
    {
        return $param = isset($_GET[$str]) ? $_GET[$str] : null;
    }

    public function setVideoData($data)
    {
        $array = [];

        foreach ($data as $key => $value) {
            $array[$key] =  is_array($value) ? $value : urlencode($value);
        }

        return $array;
    }

    private function getData()
    {
        $event        = $this->getDataFromUrl('event');
        $elapsed_time = $this->getDataFromUrl('elapsed_time');
        $video_data   = $this->setVideoData($this->getDataFromUrl('video_data'));

        switch ($event) {
            case 'firstplay':
                $this->data[] = (object) [
                    'status' => (integer) 200,
                    'event' => (string) 'Event firstplay.',
                    'video_data' => (object) $video_data
                ];
                break;

            case 'play':
                $this->data = (object) [
                    'status' => (integer) 200,
                    'event' => (string) 'Event play',
                    'elapsed_time' => (integer) $elapsed_time,
                    'video_data' => (object) $video_data
                ];
                break;

            case 'ended':
                $this->data = (object) [
                    'status' => (integer) 200,
                    'event' => (string) 'Event ended.',
                    'video_data' => (object) $video_data
                ];
                break;

            default:
                $this->setHeaderForbidden();
                $this->data = (object) [
                    'status' => (integer) 403,
                    'message' => (string) 'Error 403 Access Denied/Forbidden.'
                ];
                break;
        }

        return $this->data;
    }

    public function setJsonResponse()
    {
        return json_encode($this->getData());
    }
}

echo (new Api())->setJsonResponse();
