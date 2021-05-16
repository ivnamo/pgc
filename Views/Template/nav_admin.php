
    
    <!-- Sidebar menu-->
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">
      <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="<?= base_url();?>Assets/images/uploads/avatar/<?=$_SESSION['userData']['avatar']?>" alt="User Image">
        <div>
          <p class="app-sidebar__user-name"><?php echo $_SESSION['userData']['nombre']." ".$_SESSION['userData']['apellidos'];?></p>
          <p class="app-sidebar__user-name"><?php echo $_SESSION['userData']['empresa'];?></p>
          <p class="app-sidebar__user-designation"><?php echo $_SESSION['userData']['nombrerol'];?></p>
        </div>
      </div>
      <ul class="app-menu">
        <?php if(!empty($_SESSION['permisos'][1]['r'])) {?>
        <li><a class="app-menu__item" href="<?= base_url();?>dashboard"><i class="app-menu__icon fa fa-dashboard"></i><span class="app-menu__label">Dashboard</span></a></li>
        <?php } ?>
        <?php if(!empty($_SESSION['permisos'][2]['r']) || !empty($_SESSION['permisos'][3]['r'])) {?>
        <li class="treeview">
          <a class="app-menu__item" href="#" data-toggle="treeview">
            <i class="app-menu__icon fa fa-users" aria-hidden="true"></i>
            <span class="app-menu__label">Usuarios</span>
            <i class="treeview-indicator fa fa-angle-right"></i>
          </a>
          <ul class="treeview-menu">
          <?php if(!empty($_SESSION['permisos'][2]['r'])) {?>
            <li><a class="treeview-item" href="<?= base_url();?>usuarios"><i class="icon fa fa-circle-o"></i> Usuarios</a></li>
            <?php } ?>
            <?php if(!empty($_SESSION['permisos'][3]['r'])) {?>
            <li><a class="treeview-item" href="<?= base_url();?>roles"><i class="icon fa fa-circle-o"></i> Roles</a></li>
            <?php } ?>
          </ul>
        </li>
        <?php } ?>

        <?php if(!empty($_SESSION['permisos'][5]['r'])) {?>
        <li class="treeview">
          <a class="app-menu__item" href="#" data-toggle="treeview">
            <i class="app-menu__icon far fa-clipboard" aria-hidden="true"></i>
            <span class="app-menu__label">Desarrollo de Personas</span>
            <i class="treeview-indicator fa fa-angle-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a class="treeview-item" href="<?= base_url();?>LibretaLider/indLibretaLider"><i class="icon fa fa-circle-o"></i> Indicadores</a></li>
            <li><a class="treeview-item" href="<?= base_url();?>colabLider"><i class="icon fa fa-circle-o"></i> Colaboradores</a></li>
            <li><a class="treeview-item" href="<?= base_url();?>libretaLider"><i class="icon fa fa-circle-o"></i> Libreta del Líder</a></li>
            <li><a class="treeview-item" href="<?= base_url();?>desarrolloLider"><i class="icon fa fa-circle-o"></i> Desarrollo</a></li>
          </ul>
        </li>
        <?php } ?>

        <li>
          <a class="app-menu__item" href="<?= base_url();?>logout">
          <i class="app-menu__icon fa fa-sign-out fa-lg"></i>
          <span class="app-menu__label">Logout</span>
        </a>
      </li>

      </ul>
      
    </aside>