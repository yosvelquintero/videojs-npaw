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
        $event = $this->getDataFromUrl('event');

        switch ($event) {
            case 'firstplay':
                $this->data = [
                    'status' => (integer) 200,
                    'event' => (string) 'Event firstplay.'
                ];
                break;

            case 'play':
                $this->data   = [
                    'status' => (integer) 200,
                    'event' => (string) 'Event play',
                    'elapsed_time' => (integer) $this->getDataFromUrl('elapsed_time')
                ];
                break;

            case 'ended':
                $this->data = [
                    'status' => (integer) 200,
                    'event' => (string) 'Event ended.'
                ];
                break;

            default:
                $this->setHeaderForbidden();
                $this->data = [
                    'status' => (integer) 403,
                    'message' => (string) 'Error 403 Access Denied/Forbidden'
                ];
                break;
        }

        return $this->data;
    }

    public function setJsonResponse()
    {
        $json = ['data' => $this->getData()];
        return json_encode($json);
    }
}

echo (new Api())->setJsonResponse();
