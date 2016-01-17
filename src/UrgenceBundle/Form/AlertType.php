<?php

namespace UrgenceBundle\Form;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use UrgenceBundle\Entity\PublicUser;

class AlertType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('info', 'textarea')
            ->add('latPos', 'hidden')
            ->add('longPos', 'hidden')
            ->add('alertType', 'Symfony\Bridge\Doctrine\Form\Type\EntityType', array(
                'class' => 'UrgenceBundle\Entity\AlertType',
                'choice_label' => 'name'
            ))
            ->add('severity', 'Symfony\Bridge\Doctrine\Form\Type\EntityType', array(
                'class' => 'UrgenceBundle\Entity\Severity',
                'choice_label' => 'name'
            ))
            ->add('public_user', new PublicUserType())
            ->add('save', 'submit', array('label' => 'Envoyer'))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'UrgenceBundle\Entity\Alert',
            'cascade_validation' => true
        ));
    }
}
