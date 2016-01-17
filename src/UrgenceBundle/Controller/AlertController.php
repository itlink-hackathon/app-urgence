<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlertController extends Controller
{    
    public function alertAction()
    {
        return $this->render('UrgenceBundle:Alert:alert.html.twig');
    }
    
    public function voirAlertesAction()
    {
        return $this->render('UrgenceBundle:Alert:voirAlertes.html.twig');
    }
    
    public function allAlertsAction()
    {
        $geojson = array();
        $geojson['type'] = "FeatureCollection";
        $alerts = null;
        
        $tmp_geojson = array();
        $alerts = $this->getDoctrine()->getRepository('UrgenceBundle:Alert')->findAll();
        
        foreach($alerts as $alert){
            $user = $alert->getPublicUser();
            
            $fullName = "";
            $description = "";
            $age = "";
            $genre = "";
            $firstname = "";
            $lastname = "";
            $timeAlerte = "";
            $severity = "";
            $alerteType = "";
            
            if($user != null){
                $fullName = $user->getFirstName() == null ? "" : $user->getFirstName();
                $fullName .= $user->getLastName() == null ? "" : " ".$user->getLastName();
                $description = $alert->getInfo() == null ? "" : $alert->getInfo();
                $age = $user->getAge() == null ? "" : $user->getAge();
                $genre = $user->getGenre() == null ? "" : $user->getGenre();
                $firstname = $user->getFirstName() == null ? "" : $user->getFirstName();
                $lastname = $user->getLastName() == null ? "" : $user->getLastName();
            } 
            
            $timeAlerte = $alert->getDatetimeSent() == null ? "" : $alert->getDatetimeSent();
            $severity = $alert->getSeverity()->getName() == null ? "" : $alert->getSeverity()->getName();
            $alerteType = $alert->getAlertType()->getName() == null ? "" : $alert->getAlertType()->getName();
            
            $item =array();
            $item['type'] = 'Feature';
            $item['geometry']['coordinates'] = array($alert->getLongPos(), $alert->getLatPos());
            $item['geometry']['type'] = 'Point';
            $item['properties']['title'] = strlen($fullName) > 0? $fullName: "-" ;
            $item['properties']['description'] = strlen($description) > 0? $description : "-";
            $item['properties']['marker-color'] = "#fc4353"; 
            $item['properties']['other-data']['age'] = $age;
            $item['properties']['other-data']['genre'] = strlen($genre) > 0? $genre : "-";
            $item['properties']['other-data']['firstname'] = strlen($firstname) > 0? $firstname : "-";
            $item['properties']['other-data']['lastname'] = strlen($lastname) > 0? $lastname : "-";
            $item['properties']['other-data']['timestamp_alerte'] = $timeAlerte;
            $item['properties']['other-data']['severity'] = $severity;
            $item['properties']['other-data']['alert_type'] = $alerteType;
            $tmp_geojson[] = $item;
        }        
        
        $geojson['features'] = $tmp_geojson;
        return new JsonResponse($geojson);
    }
    
    public function clearDatasAction()
    {
        
        $em = $this->getDoctrine()->getManager();
        $alerts = $this->getDoctrine()->getRepository('UrgenceBundle:Alert')->findAll();
        $users = $this->getDoctrine()->getRepository('UrgenceBundle:PublicUser')->findAll();
        
        foreach($alerts as $alert){
            $em->remove($alert);
            $em->flush();
        }
        
        foreach($users as $user){
            $em->remove($user);
            $em->flush();
        }
        
        return new JsonResponse(array('success' => true));
    }
}