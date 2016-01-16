<?php

namespace UrgenceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Alert
 *
 * @ORM\Table(name="alert")
 * @ORM\Entity(repositoryClass="UrgenceBundle\Repository\AlertRepository")
 */
class Alert
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="id_parse", type="string", length=80, nullable=true)
     */
    private $idParse;

    /**
     * @var string
     *
     * @ORM\Column(name="info", type="string", length=255, nullable=true)
     */
    private $info;

    /**
     * @var float
     *
     * @ORM\Column(name="lat_pos", type="float", precision=10, scale=6)
     */
    private $latPos;

    /**
     * @var float
     *
     * @ORM\Column(name="long_pos", type="float", precision=10, scale=6)
     */
    private $longPos;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datetime_sent", type="datetime", nullable=true)
     */
    private $datetimeSent;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datetime_received", type="datetime", nullable=true)
     */
    private $datetimeReceived;


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
}
