<?php

    class ColabLiderModel extends Mysql
    {

        public function __construct()
        {
            parent::__construct();
        }


        public function selectLideres()
        {
            $noAdmin="";
            $this->intIdUser = $_SESSION['idUser'];

            if($_SESSION['idUser']>2)
            {

                $noAdmin=" AND idpersona = $this->intIdUser";
            }
         
            $sql = "SELECT * FROM persona WHERE status !=0 AND idpersona !=1".$noAdmin;
            $request = $this->select_all($sql);
            return $request;
        }

        public function selectColabs()
        {
            
            $noAdmin="";
            $this->intIdUser = $_SESSION['idUser'];

            if($_SESSION['idUser']>2)
            {

                $noAdmin=" AND personaid = $this->intIdUser";
            }

           

            $sql = "SELECT c.idcolaborador,
            CONCAT(c.nombre,' ',c.apellido) AS colaborador,c.status,c.personaid,
            CONCAT(p.nombre,' ',p.apellidos) AS lider,p.empresa 
            FROM colaborador c
            INNER JOIN persona p
            ON p.idpersona=c.personaid
            WHERE c.status!=0". $noAdmin;

                    $request = $this->select_all($sql);
                    return $request;

        }

        public function selectColab(int $idcolaborador)
        {
            
            $this->intIdColaborador = $idcolaborador;

            $sql = "SELECT  *
                    FROM colaborador
                    WHERE idcolaborador = '{$this->intIdColaborador}'";
                    $request = $this->select($sql);
                    return $request;
        }

        public function insertColab(int $intLiderid,string $srtNombre,string $strApellido, int $intStatus)
        {

            $this->intLiderid = $intLiderid;
            $this->strNombre = $srtNombre;
            $this->strApellido = $strApellido;
            $this->intStatus = $intStatus;
         

            $query_insert = "INSERT INTO colaborador(
                        nombre,apellido,status,personaid) VALUES (?,?,?,?)";

            $arrData = array(
                        $this->strNombre,
                        $this->strApellido,
                        $this->intStatus,
                        $this->intLiderid);

            $request_insert = $this->insert($query_insert,$arrData);
            return $request_insert;

        }

        public function updateColab(int $intColaboradorid, string $srtNombre,string $strApellido, int $intStatus)
        {
            
            $this->strNombre = $srtNombre;
            $this->strApellido = $strApellido;
            $this->intColaboradorid = $intColaboradorid;
            $this->intStatus = $intStatus;
         

            $query = "UPDATE colaborador SET nombre=?,apellido=?,status=?
                            WHERE idcolaborador = $this->intColaboradorid";

            $arrData = array(
                        $this->strNombre,
                        $this->strApellido,
                        $this->intStatus);

            $request = $this->update($query,$arrData);
            return $request;

        }

        public function deleteColab(int $idcolaborador)
        {

            $this->intIdColaborador = $idcolaborador;


                $sql = "UPDATE colaborador SET status =? WHERE idcolaborador=$this->intIdColaborador";
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

       



    }//fin class


?>