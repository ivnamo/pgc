<?php

    class DesarrolloLider extends Controllers
    {
        public function __construct()
        {
            parent::__construct();
            session_start();

            if(empty($_SESSION['login'])){
                header('Location:'.base_url().'login');
            }
            getPermisos(5);
            
        }

        public function desarrolloLider()
        {
            
            $data['page_tag'] = "Desarrollo del Líder";
            $data['page_title'] = "Desarrollo";
            $data['page_name'] = "desarrolloLider";
            $data['page_functions_js'] = "functions_desarrollolider.js";
            $this->views->getView($this,"desarrolloLider",$data);
            
            
        }

        public function getSelectCols()
        {
            $hmtlOptions="";
            $arrData = $this->model->selectCols();
            if(count($arrData)>0)
            {
                for ($i=0; $i <count($arrData) ; $i++) 
                {
                    if($arrData[$i]['status']== 1)
                    {
                    $hmtlOptions .= '<option value="'.$arrData[$i]['idpersona'].'">'.$arrData[$i]['nombre']." ".$arrData[$i]['apellidos'].'</option>';
                    } 
                }
            }else{
                $hmtlOptions = '<option value=0 selected disabled>No hay líderes creados</option>';
            }
            echo $hmtlOptions;
            die();
        }


        public function setFile()
        {
            
            if($_SESSION)
            {
                if (!empty($_FILES)) 
                {

                    $idUsuario = intval($_SESSION['idUser']);
                    $imagePath = isset($_FILES["file"]["name"]) ? $_FILES["file"]["name"] : "Undefined";
                    $filename=$_FILES["file"]["name"];
                    $micarpeta = 'Assets/files/id'.$idUsuario.'/';
                    $destino = $micarpeta.$filename;
                    $tempFile = $_FILES['file']['tmp_name'];

                    if (!file_exists($micarpeta)) 
                    {
                        mkdir($micarpeta, 0777, true);
                    }

                        if(file_exists($destino))
                        {
                            $arrData=$this->model->insertFile($idUsuario,$filename);
                            move_uploaded_file($tempFile, $destino);
                            $arrResponse = array('status'=>true, 'filename'=>$imagePath,'tipo' =>'Actualización','msg' =>'Archivo actualizado correctamente');
                        
                        }else if(!file_exists($destino)){
                            $arrData=$this->model->insertFile($idUsuario,$filename);
                            move_uploaded_file($tempFile, $destino);
                            $arrResponse = array('status'=>true, 'filename'=>$imagePath,'tipo' =>'Nuevo', 'msg' =>'Archivo nuevo guardado correctamente');
                        }else{
                            $arrResponse = array('status'=>false, 'msg' =>'Error de carga');
                        }
                    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                }
      
             die();
            
            }   
        }

        public function getDocs()
        {
         if($_SESSION['permisosMod']['r']){
            
            $arrData = $this->model->selectDocs();

            for ($i=0; $i < count($arrData) ; $i++) { 
                
                $btnDownload='';
                $btnDelete='';
                $link = base_url()."DesarrolloLider/DownloadFile/" ;
              
 
             if($_SESSION['permisosMod']['u'])
             {
               
                     $btnDownload='<a class="btn btn-info btn-sm btnDownloadDoc" href="'.$link.$arrData[$i]['iddesarrollolider'].'" title="Descargar Doc"><i class="fas fa-download"></i></a>';
                     
             }
 
             
 
             if($_SESSION['permisosMod']['d'])
             {
                 
                 $btnDelete='<button class="btn btn-danger btn-sm btnDelDoc" onClick="fntDelDoc('.$arrData[$i]['iddesarrollolider'].')" title="Eliminar Doc"><i class="far fa-trash-alt"></i></button>';
             }
             
              
             $arrData[$i]["options"] = '<div class="text-center">'.$btnDownload.' '.$btnDelete.'</div>';
             
         }
         
         echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
         }
         die();
 
        }


        public function DownloadFile($iddesarrollolider)
        {

            if($_SESSION['permisosMod']['u'])
            {

                    $iddesarrollolider = intval($iddesarrollolider);

                    if($iddesarrollolider>0)
                    {
                        $arrData = $this->model->selectDoc($iddesarrollolider);

                        if(empty($arrData))
                        {
                            $arrResponse = array('status'=>false,'msg'=>'Datos no encontrados');
                            
                        }else
                        {
                            $arch="../pgc/Assets/files/id".$arrData['personaid']."/".$arrData['filename'];
                            header('Content-Description: File Transfer');
                            header('Content-Type: application/force-download');
                            header('Content-Disposition: attachment; filename='.basename($arch));
                            header('Content-Transfer-Encoding: binary');
                            header('Expires: 0');
                            header('Cache-Control: max-age=0');
                            header('Pragma: public');
                            header('Content-Length: ' . filesize($arch));
                            ob_clean();
                            flush();
                            readfile($arch);



                            $arrResponse = array('status'=>true,'data'=>$arrData);
                        }
        
                        //echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                    }

            }


            
            die();
         
        }



        public function delDoc()
        {
             if($_POST)
             {
                 if($_SESSION['permisosMod']['d'])
                 {
 
                     $intIddesarrollolider = intval($_POST['iddesarrollolider']);
                     $arrData = $this->model->selectDoc($intIddesarrollolider);
                     $personaid = $arrData['personaid'];
                     $filename = $arrData['filename'];
                     $fecha = date_create();
                     $origen = 'Assets/files/id'.$personaid.'/'.$filename;
                     $destino = 'Assets/files/eliminado/'.$filename."_iddes".$intIddesarrollolider."_persid".$personaid."_".date('Y-m-d');

                    




                     $requestDelete = $this->model->deleteDoc($intIddesarrollolider);
                     if($requestDelete =='ok')
                     {
                            
                            copy($origen,$destino);
                            unlink($origen);
                             $arrResponse = array('status'=>true,'msg'=>'Se ha eliminado el documento');
                         
                     }else
                     {
                             $arrResponse = array('status'=>false,'msg'=>'Error al eliminar el documento');
                     }
 
                 
                         echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                 }
             }
                     die();
         
         }
 

    

    }// fin class
?>