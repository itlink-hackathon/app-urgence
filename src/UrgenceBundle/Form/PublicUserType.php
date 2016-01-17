<?php

namespace UrgenceBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PublicUserType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lastName', 'text')
            ->add('firstName', 'text')
            ->add('phone', 'text')
            ->add('mail','email')
            ->add('genre', 'choice', array(
                'choices' => array('M' => 'Homme', 'F' => 'Femme')
            ))
            ->add('age', 'integer', array(
                    'label' => 'Age', 
                    'data' => 0, // default value
                    'precision' => 0, // disallow floats
                ))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'UrgenceBundle\Entity\PublicUser'
        ));
    }
}
