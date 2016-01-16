<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use UrgenceBundle\Entity\Alert;
use UrgenceBundle\Entity\PublicUser;
use UrgenceBundle\Form\AlertType;

class FormController extends Controller
{
    /**
     * @Route("/add")
     */
    public function addAction()
    {
        return $this->render('UrgenceBundle:Form:add.html.twig', array(
            // ...
        ));
    }


    public function indexAction(Request $request)
    {
        $alert = new Alert();

        $form = $this->get('form.factory')->create(new AlertType(), $alert);


        return $this->render('@Urgence/Form/index.html.twig',array(
            'form' => $form->createView()
        ));


    }

}
