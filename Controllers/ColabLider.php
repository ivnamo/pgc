<?php

    class ColabLider extends Controllers
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

        public function colabLider()
        {
            
            $data['page_tag'] = "Colaboradores del Líder";
            $data['page_title'] = "Colaboradores";
            $data['page_name'] = "colabLider";
            $data['page_functions_js'] = "functions_colablider.js";
            $this->views->getView($this,"colabLider",$data);
            
            
        }


        public function getSelectLideres()
        {
            $hmtlOptions="";
            $arrData = $this->model->selectLideres();
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

        public function getColabs()
        {
            if($_SESSION['permisosMod']['r'])
            {
            
                $arrData = $this->model->selectColabs();

                        if($arrData>0)
                        {
                                for ($i=0; $i < count($arrData) ; $i++) 
                                { 
                                    
                                            $btnEdit='';
                                            $btnDelete='';
                            
                                            if($arrData[$i]["status"]==1)
                                            {
                                                $arrData[$i]["status"] = '<span class="badge badge-success">Activo</span>';
                                            }else{
                                
                                                $arrData[$i]["status"] = '<span class="badge badge-danger">Inactivo</span>';
                                            }
                            
                                        
                            
                                        if($_SESSION['permisosMod']['u'])
                                        {
                                        
                                            $btnEdit='<button class="btn btn-primary btn-sm btnEditColab" onClick="fntEditColab('.$arrData[$i]['idcolaborador'].')" title="Editar Colaborador"><i class="fas fa-pencil-alt"></i></button>';
                                        
                                        }
                            
                                        
                            
                                        if($_SESSION['permisosMod']['d'])
                                        {
                                            
                                            $btnDelete='<button class="btn btn-danger btn-sm btnDelColab" onClick="fntDelColab('.$arrData[$i]['idcolaborador'].')" title="Eliminar Colaborador"><i class="far fa-trash-alt"></i></button>';
                            
                                        }
                                        
                                        $arrData[$i]["options"] = '<div class="text-center">'.$btnEdit.' '.$btnDelete.'</div>';
                                
                                }
                        }
            
         
                echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
            }// fin permiso lectura
         die();
 
        }

        //seleccionar 1 colaborador
        public function getColab($idcolaborador)
        {
            if($_SESSION['permisosMod']['r'])
            {
                $idcolaborador = intval($idcolaborador);
                if($idcolaborador>0)
                {
                    $arrData = $this->model->selectColab($idcolaborador);

                    if(empty($arrData))
                    {
                        $arrResponse = array('status'=>false,'msg'=>'Datos no encontrados');
                    }else
                    {
                        $arrResponse = array('status'=>true,'data'=>$arrData);
                    }
     
                    echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                 }
            }
                die();

        }

        public function setColab()
        {
            
            if($_POST)
            {


                if(empty($_POST['txtNombre'])||empty($_POST['txtApellido'])||empty($_POST['listStatus'])||empty($_POST['listLiderid']))
                {
                    $arrResponse = array("status"=>false,"msg"=>"Datos incorrectos.");
                }else
                {
              
                    $idcolaborador = intval($_POST['idcolaborador']);
                    $intLiderid = intval($_POST['listLiderid']);
                    $strNombre = ($_POST['txtNombre']);
                    $strApellido = ($_POST['txtApellido']);
                    $intStatus = intval($_POST['listStatus']);
                    $request ="";

                   
                    if($idcolaborador==0)
                    {

                        if($_SESSION['permisosMod']['w'])
                        {
                            $request = $this->model->insertColab($intLiderid,
                                                                    $strNombre,
                                                                    $strApellido,
                                                                    $intStatus);
                        }
                    }else
                    {

                        if($_SESSION['permisosMod']['u'])
                        {
                            $request = $this->model->updateColab($idcolaborador,
                                                                    $strNombre,
                                                                    $strApellido,
                                                                    $intStatus);
                        }
                    }

                    if($request>0)
                    {
                        $arrResponse = array("status"=>true,"msg"=>"Datos guardados correctamente.");

                    }else
                    {
                        $arrResponse = array("status"=>false,"msg"=>"No es posible almacenar datos.");

                    }


                }
               
                
                echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);

            }
            die();
        }

    
        public function delColab()
        {
            if($_POST)
            {
    
                if($_SESSION['permisosMod']['d'])
                {
                    $intIdColaborador = intval($_POST['idcolaborador']);
                    $requestDelete = $this->model->deleteColab($intIdColaborador);

                    if($requestDelete =='ok')
                    {
                            $arrResponse = array('status'=>true,'msg'=>'Se ha eliminado el colaborador');
                        
                    }else
                    {
                            $arrResponse = array('status'=>false,'msg'=>'Error al eliminar el colaborador');
                    }
    
                 
                        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
                }
            }
                    die();
            
        }

    
    
    

    }// fin class
?>