<?php

    class DesarrolloLiderModel extends Mysql
    {

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

                $noAdmin=" AND idpersona = $this->intIdUser";
            }
         
            $sql = "SELECT * FROM persona WHERE status !=0".$noAdmin;
            $request = $this->select_all($sql);
            return $request;
        }

        public function insertFile(int $idUsuario, string $filename)
        {
            $this->intIdUsuario = $idUsuario;
            $this->strFile = $filename;

            if($idUsuario!=$_SESSION['idUser']){

                $sql = "SELECT * 
                    FROM persona    
                    WHERE idpersona = $idUsuario AND status!=0";

                $request = $this->select($sql);
                $this->strEmpresa = $request['empresa'];

            }else{
                $this->strEmpresa = $_SESSION['userData']['empresa'];
            }


            
            $sql = "SELECT * 
                    FROM desarrollolider    
                    WHERE (filename = '{$this->strFile}' AND personaid = '{$this->intIdUsuario}' AND status!=0)";
            $request = $this->select_all($sql);

            if(empty($request))
            {

            $sql = "INSERT INTO desarrollolider(
                personaid,filename,empresa) VALUES (?,?,?)";
      
                $arrData = array(
                    $this->intIdUsuario,
                    $this->strFile,
                    $this->strEmpresa
                );
            
                $request = $this->insert($sql,$arrData);
               
            }else{

                $query = "UPDATE desarrollolider SET fechacreacion=CURRENT_TIMESTAMP,version=version+1
                            WHERE (filename = '{$this->strFile}' AND personaid = '{$this->intIdUsuario}')";

                $arrData = array();

                $request = $this->update($query,$arrData);


            }


            return $request;
        }


        public function selectDocs()
        {


                        
            $noAdmin="";
            $this->intIdUser = $_SESSION['idUser'];

            if($_SESSION['idUser']>2)
            {

                $noAdmin=" AND personaid = $this->intIdUser";
            }

           

            $sql = "SELECT d.*,
            DATE_FORMAT(d.fechacreacion , '%d/%m/%Y') as fechacreacion,
            DATE_FORMAT(d.fechacreacion , '%H:%i:%s') as horacreacion,
            CONCAT(p.nombre,' ',p.apellidos) AS lider
                        FROM desarrollolider d
                        INNER JOIN persona p
                        ON p.idpersona=d.personaid
                        WHERE d.status!=0". $noAdmin;

                    $request = $this->select_all($sql);
                    return $request;

        }


        public function selectDoc(int $iddesarrollolider)
        {
            
            $this->intIdDesarrolloLider = $iddesarrollolider;

            $sql = "SELECT  *
                    FROM desarrollolider
                    WHERE iddesarrollolider = '{$this->intIdDesarrolloLider}'";
                    $request = $this->select($sql);
                    return $request;
        }



        public function deleteDoc(int $iddesarrollolider){

            $this->idDesarrollolider = $iddesarrollolider;


                $sql = "UPDATE desarrollolider SET status =? WHERE iddesarrollolider=$this->idDesarrollolider";
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
