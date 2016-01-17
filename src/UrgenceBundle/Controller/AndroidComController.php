<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use UrgenceBundle\Entity\PublicUser;
use UrgenceBundle\Entity\Alert;

class AndroidComController extends Controller
{
    public function newAlertAction()
    {
        $result = array('success' => false);
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            $data = get_object_vars(json_decode(file_get_contents("php://input")));
            
            // Validate received datas
            if($this->validateNewAlert($data)){                
                $alerteToAdd = new Alert(); 
                
                /// timestamps
                $dtStr = date("c", $data['timestamp_current']);
                $date = new \DateTime($dtStr);                
                $alerteToAdd->setDatetimeSent($date);
                $dtStr = date("c", $data['timestamp_position']);
                $date = new \DateTime($dtStr);    
                $alerteToAdd->setDatetimeReceived($date);
                
                // location
                $alerteToAdd->setLongPos($data['longitude']);
                $alerteToAdd->setLatPos($data['latitude']);
                
                // user
                $newUserToAdd = new PublicUser();
                
                $newUserToAdd->setFirstName($data['firstname']);
                $newUserToAdd->setLastName($data['lastname']);        
                $newUserToAdd->setPhone($data['phone_number']);
                $newUserToAdd->setGenre($data['genre']);
                
                if(is_integer(intval($data['age']))){
                    $newUserToAdd->setAge(intval($data['age']));
                }else{
                    $newUserToAdd->setAge(null);
                }
                                          
                $em = $this->getDoctrine()->getManager();
                $em->persist($newUserToAdd);
                $em->flush();
                
                // Default alert level 
                $alertType = $this->getDoctrine()->getRepository('UrgenceBundle:AlertType')->find(1);
                $alerteToAdd->setAlertType($alertType);
                $severity = $this->getDoctrine()->getRepository('UrgenceBundle:Severity')->find(3);
                $alerteToAdd->setSeverity($severity);
                $alerteToAdd->setInfo($data['drive_link']);
                $alerteToAdd->setPublicUser($newUserToAdd);
                
                // add new datas
                $em = $this->getDoctrine()->getManager();
                $em->persist($alerteToAdd);
                $em->flush();
                
                $result['success'] = true; 
                $result['message'] = "Alert saved";
            }else{
                $result['message'] = "Wrond datas";
            }
        }
        else{            
            $result['message'] = "Wrong request";
        }      
        
        return new JsonResponse($result);
    }
               
    private function validateNewAlert($data){
        $result = true;

        // Check is json object is OK
        $result &= isset($data['timestamp_current']);
        $result &= isset($data['timestamp_position']);
        $result &= isset($data['latitude']);
        $result &= isset($data['longitude']);
        $result &= isset($data['firstname']);
        $result &= isset($data['lastname']);        
        $result &= isset($data['phone_number']);    
        $result &= isset($data['drive_link']);     
        $result &= isset($data['genre']);    
        $result &= isset($data['age']);
        
        // Check not null datas
        $result &= $data['timestamp_current']!=null;
        $result &= $data['timestamp_position']!=null;
        $result &= $data['latitude']!=null;
        $result &= $data['longitude']!=null;
        $result &= $data['firstname']!=null;
        $result &= $data['lastname']!=null;        
        $result &= $data['phone_number']!=null;    
        $result &= $data['drive_link']!=null;        
        $result &= $data['genre']!=null;    
        $result &= $data['age']!=null;
        
        return $result;
    }


               
               
}