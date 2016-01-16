<?php

namespace UrgenceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Alert
 */
class Alert
{
    /**
     * @var string
     */
    private $idParse;

    /**
     * @var string
     */
    private $info;

    /**
     * @var float
     */
    private $latPos;

    /**
     * @var float
     */
    private $longPos;

    /**
     * @var \DateTime
     */
    private $datetimeSent;

    /**
     * @var \DateTime
     */
    private $datetimeReceived;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var \UrgenceBundle\Entity\AlertType
     */
    private $idAlertType;

    /**
     * @var \UrgenceBundle\Entity\Severity
     */
    private $idSeverity;


    /**
     * Set idParse
     *
     * @param string $idParse
     * @return Alert
     */
    public function setIdParse($idParse)
    {
        $this->idParse = $idParse;

        return $this;
    }

    /**
     * Get idParse
     *
     * @return string 
     */
    public function getIdParse()
    {
        return $this->idParse;
    }

    /**
     * Set info
     *
     * @param string $info
     * @return Alert
     */
    public function setInfo($info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Get info
     *
     * @return string 
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Set latPos
     *
     * @param float $latPos
     * @return Alert
     */
    public function setLatPos($latPos)
    {
        $this->latPos = $latPos;

        return $this;
    }

    /**
     * Get latPos
     *
     * @return float 
     */
    public function getLatPos()
    {
        return $this->latPos;
    }

    /**
     * Set longPos
     *
     * @param float $longPos
     * @return Alert
     */
    public function setLongPos($longPos)
    {
        $this->longPos = $longPos;

        return $this;
    }

    /**
     * Get longPos
     *
     * @return float 
     */
    public function getLongPos()
    {
        return $this->longPos;
    }

    /**
     * Set datetimeSent
     *
     * @param \DateTime $datetimeSent
     * @return Alert
     */
    public function setDatetimeSent($datetimeSent)
    {
        $this->datetimeSent = $datetimeSent;

        return $this;
    }

    /**
     * Get datetimeSent
     *
     * @return \DateTime 
     */
    public function getDatetimeSent()
    {
        return $this->datetimeSent;
    }

    /**
     * Set datetimeReceived
     *
     * @param \DateTime $datetimeReceived
     * @return Alert
     */
    public function setDatetimeReceived($datetimeReceived)
    {
        $this->datetimeReceived = $datetimeReceived;

        return $this;
    }

    /**
     * Get datetimeReceived
     *
     * @return \DateTime 
     */
    public function getDatetimeReceived()
    {
        return $this->datetimeReceived;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idAlertType
     *
     * @param \UrgenceBundle\Entity\AlertType $idAlertType
     * @return Alert
     */
    public function setIdAlertType(\UrgenceBundle\Entity\AlertType $idAlertType = null)
    {
        $this->idAlertType = $idAlertType;

        return $this;
    }

    /**
     * Get idAlertType
     *
     * @return \UrgenceBundle\Entity\AlertType 
     */
    public function getIdAlertType()
    {
        return $this->idAlertType;
    }

    /**
     * Set idSeverity
     *
     * @param \UrgenceBundle\Entity\Severity $idSeverity
     * @return Alert
     */
    public function setIdSeverity(\UrgenceBundle\Entity\Severity $idSeverity = null)
    {
        $this->idSeverity = $idSeverity;

        return $this;
    }

    /**
     * Get idSeverity
     *
     * @return \UrgenceBundle\Entity\Severity 
     */
    public function getIdSeverity()
    {
        return $this->idSeverity;
    }
    /**
     * @var \UrgenceBundle\Entity\PublicUser
     */
    private $idUser;


    /**
     * Set idUser
     *
     * @param \UrgenceBundle\Entity\PublicUser $idUser
     * @return Alert
     */
    public function setIdUser(\UrgenceBundle\Entity\PublicUser $idUser = null)
    {
        $this->idUser = $idUser;

        return $this;
    }

    /**
     * Get idUser
     *
     * @return \UrgenceBundle\Entity\PublicUser 
     */
    public function getIdUser()
    {
        return $this->idUser;
    }
}
