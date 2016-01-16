<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use UrgenceBundle\Entity\PublicUser;

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
        $public_user = new PublicUser();

        $formBuilder = $this->get('form.factory')->createBuilder('form',$public_user);

        $formBuilder->add('last_name','text')->add('first_name')->add('phone','text')->add('mail','email')->add('save','submit');
        $form = $formBuilder->getForm();
        return $this->render('@Urgence/Form/index.html.twig',array(
            'form' => $form->createView()
        ));


    }

}
