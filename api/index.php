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

    private function getData()
    {
        $event        = $this->getDataFromUrl('event');
        $elapsed_time = (integer) $this->getDataFromUrl('elapsed_time');
        $current_src  = urldecode($this->getDataFromUrl('current_src'));

        switch ($event) {
            case 'firstplay':
                $this->data[] = (object) [
                    'status' => (integer) 200,
                    'event' => (string) 'Event firstplay.',
                    'current_src' => $current_src
                ];
                break;

            case 'play':
                $this->data = (object) [
                    'status' => (integer) 200,
                    'event' => (string) 'Event play',
                    'elapsed_time' => $elapsed_time,
                    'current_src' => $current_src
                ];
                break;

            case 'ended':
                $this->data = (object) [
                    'status' => (integer) 200,
                    'event' => (string) 'Event ended.',
                    'current_src' => $current_src
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
