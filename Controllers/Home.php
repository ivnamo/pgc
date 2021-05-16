<?php

    class Home extends Controllers
    {
        public function __construct()
        {
            parent::__construct();
            session_start();

            if(empty($_SESSION['login'])){
                header('Location:'.base_url().'login');
            }
            
        }

        public function home()
        {
            $data['page_id'] = 1;
            $data['page_tag'] = "Home";
            $data['page_title'] = "Página principal";
            $data['page_name'] = "home";
            $data['page_content'] = "Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Obcaecati deserunt nam praesentium eius, ducimus ipsa laudantium rerum minima 
            facere provident autem blanditiis vel expedita iusto cumque? Architecto rerum autem dicta";
            $this->views->getView($this,"home",$data);
            
        }
    }
?>