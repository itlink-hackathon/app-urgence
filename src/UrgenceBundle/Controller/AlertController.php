<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
}