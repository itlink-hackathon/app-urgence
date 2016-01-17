<?php

namespace UrgenceBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use UrgenceBundle\Entity\Alert;
use UrgenceBundle\Entity\Severity;
use UrgenceBundle\Entity\PublicUser;
use UrgenceBundle\Form\AlertType;
use Symfony\Component\HttpFoundation\Session\Session;


class FormController extends Controller
{

    /**
     * Basic route for testing adding information into the database
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function insertAction(Request $request)
    {
        $user = new PublicUser();
        $user->setFirstName();
        $alert = new Alert();
        $severity = new Severity();
        $severity->setName("name1");
        $alerttype = new \UrgenceBundle\Entity\AlertType();
        $alerttype->setName('name2');
        $alert->setInfo("Info");
        $alert->setDatetimeReceived(new \DateTime());
        $alert->setDatetimeSent(new \DateTime());
        $alert->setIdParse('idParse');
        $alert->setLatPos("46.891296");
        $alert->setLongPos("-0.930691");
        $alert->setSeverity($severity);
        $alert->setAlertType($alerttype);

        $em = $this->getDoctrine()->getManager();
        $em->persist($alert);
        $em->flush();
        return $this->render('UrgenceBundle:Form:add.html.twig', array(
        ));
    }


    public function indexAction(Request $request)
    {
        $alert = new Alert();

        $form = $this->get('form.factory')->create(new AlertType(), $alert);
        
        if ($form->handleRequest($request)->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $alert->setDatetimeSent(new \DateTime('now'));
            $alert->setDatetimeReceived(new \DateTime('now'));
            $em->persist($alert);
            $em->flush();

            return $this->render('@Urgence/Form/result.html.twig');
        }
        return $this->render('@Urgence/Alert/alert.html.twig',array(
            'form' => $form->createView()
        ));


    }

}
