<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AndroidComController extends Controller
{
    public function newAlertAction()
    {
        $result = array();
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            $data = json_decode(file_get_contents("php://input"));
            
            
            
            $result['success'] = true;
            $result['received_datas'] = $data;
        }
        else{
            $result = array('success' => false);
        }      
        
        return new JsonResponse($result);
    }


}