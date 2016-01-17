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
            if($user != null){
                $fullName = $user->getFirstName() == null ? "" : $user->getFirstName();
                $fullName .= $user->getLastName() == null ? "" : $user->getLastName();
                $description = $alert->getInfo() == null ? "" : $alert->getInfo();
            }            
            
            $item =array();
            $item['type'] = 'Feature';
            $item['geometry']['coordinates'] = array($alert->getLongPos(), $alert->getLatPos());
            $item['geometry']['type'] = 'Point';
            $item['properties']['title'] = strlen($fullName) > 0? $fullName: "-" ;
            $item['properties']['description'] = strlen($description) > 0? $description : "-";
            $item['properties']['marker-color'] = "#fc4353"; 
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