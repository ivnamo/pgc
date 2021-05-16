<?php

    class LibretaLiderModel extends Mysql
    {
        private $srtFecha;
        private $strEvento;
        private $intColaboradorid;
        private $intStatusLider;


        public function __construct()
        {
            parent::__construct();
        }


        public function selectCols()
        {
            $noAdmin="";
            $this->intIdUser = $_SESSION['idUser'];

            if($_SESSION['idUser']>2)
            {

                $noAdmin=" AND personaid = $this->intIdUser";
            }
         
            $sql = "SELECT * FROM colaborador WHERE status !=0".$noAdmin;
            $request = $this->select_all($sql);
            return $request;
        }

        
        public function insertEvento(string $srtFecha,string $strEvento,int $intColaboradorid, int $intStatusLider)
        {

            $this->intIdUser = $_SESSION['idUser'];
            $this->strFecha = $srtFecha;
            $this->strEvento = $strEvento;
            $this->intColaboradorid = $intColaboradorid;
            $this->intStatusLider = $intStatusLider;
         

            $query_insert = "INSERT INTO libretalider(
                        personaid,colaboradorid,fecha,evento,tipoevento) VALUES (?,?,?,?,?)";

            $arrData = array(
                        $this->intIdUser,
                        $this->intColaboradorid,
                        $this->strFecha,
                        $this->strEvento,
                        $this->intStatusLider);

            $request_insert = $this->insert($query_insert,$arrData);
            return $request_insert;

        }

        public function updateEvento(int $idLibreta,string $srtFecha,string $strEvento,int $intColaboradorid, int $intStatusLider)
        {
            
            $this->intidLibreta = $idLibreta;
            $this->strFecha = $srtFecha;
            $this->strEvento = $strEvento;
            $this->intColaboradorid = $intColaboradorid;
            $this->intStatusLider = $intStatusLider;
         

            $query = "UPDATE libretalider SET colaboradorid=?,fecha=?,evento=?,tipoevento=?
                            WHERE idlibreta = $this->intidLibreta";

            $arrData = array(
                        $this->intColaboradorid,
                        $this->strFecha,
                        $this->strEvento,
                        $this->intStatusLider);

            $request = $this->update($query,$arrData);
            return $request;

        }




        public function selectEventos()
        {
            
            $this->intIdUser = $_SESSION['idUser'];
            
            $noAdmin="";


            if($_SESSION['idUser']>2)
            {

                $noAdmin=" AND l.personaid = $this->intIdUser";
            }
           

            $sql = "SELECT l.*,DATE_FORMAT(l.fecha , '%d/%m/%Y') as fechaEvento,CONCAT(c.nombre,' ',c.apellido) AS colaborador,
		    CONCAT(p.nombre,' ',p.apellidos) AS lider, p.empresa
                    FROM libretalider l
                    INNER JOIN colaborador c ON l.colaboradorid=c.idcolaborador
                    INNER JOIN persona p ON l.personaid=p.idpersona
                    WHERE l.status !=0".$noAdmin;

                    $request = $this->select_all($sql);
                    return $request;

        }


        public function selectEvento(int $idlibreta)
        {

            $this->intIdEvento = $idlibreta;

            $sql = "SELECT  *
                    FROM libretalider
                    WHERE idlibreta = '{$this->intIdEvento}'";
                    $request = $this->select($sql);
                    return $request;
        }


        public function deleteEvento(int $idlibreta){

            $this->intIdlibreta = $idlibreta;


                $sql = "UPDATE libretalider SET status =? WHERE idlibreta=$this->intIdlibreta";
                $arrData = array(0);
                $request = $this->update($sql,$arrData);
                if($request)
                {
                    $request='ok';
                }else{
                    $request='error';
                }
        
            return $request;

        }


        ///MODELO INDICADORES LIBRETA LIDER


        public function selectIndEventos(string $fechaInicio,string $fechaFin){

            
            $this->intIdUser = $_SESSION['idUser'];
            $this->fechaInicio =$fechaInicio;
            $this->fechaFin =$fechaFin;

            $noAdmin="";
            $dateRange="";

            if($fechaInicio !="" AND $fechaFin !="")
            {
                $dateRange = " AND l.fecha BETWEEN '$this->fechaInicio' AND '$this->fechaFin'";
            }

            if($_SESSION['idUser']>2)
            {
                $noAdmin=" AND l.personaid = $this->intIdUser";
            }


            $sql="SELECT p.idcolaborador,
            CONCAT(p.nombre, ' ', p.apellido) as nombreCompleto,s.empresa,
            COUNT(case when l.tipoevento = 1 then 1 end) as pos,
            COUNT(case when l.tipoevento = 2 then 1 end) as neg,
            COUNT(case when l.tipoevento = 1 or l.tipoevento = 2 then 1 end) as total
            FROM libretalider l
            INNER JOIN colaborador p ON l.colaboradorid = p.idcolaborador
            INNER JOIN persona s ON l.personaid = s.idpersona
            WHERE l.status !=0 $dateRange $noAdmin 
            GROUP BY l.colaboradorid";

                    $request = $this->select_all($sql);
                    return $request;

        }

        public function selectIndEventosFechas(){

            $this->intIdUser = $_SESSION['idUser'];
            $noAdmin="";
            if($_SESSION['idUser']>2)
            {
                $noAdmin=" AND personaid = $this->intIdUser";
            }


            $sql="SELECT 
            DATE_FORMAT(MIN(fecha) , '%d/%m/%Y') as fechaMin, 
            DATE_FORMAT(MAX(fecha) , '%d/%m/%Y') as fechaMax
            FROM libretalider 
            WHERE status !=0".$noAdmin;


                    $request = $this->select_all($sql);

                    return $request;

        }

       



    }//fin class


?>