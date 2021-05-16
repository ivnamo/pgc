
<?php 
headerAdmin($data); 
getModal('modalPerfil',$data);
?>
<main class="app-content">
      <div class="row user">
        <div class="col-md-12">
          <div class="profile">
            <div class="info"><img class="user-img" src="<?= base_url();?>Assets/images/uploads/avatar/<?=$_SESSION['userData']['avatar']?>">
              <h4><?= $_SESSION['userData']['nombre']." ".$_SESSION['userData']['apellidos'] ?></h4>
              <p><?= $_SESSION['userData']['empresa']?></p>
            </div>
            <div class="cover-image"></div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="tile p-0">
            <ul class="nav flex-column nav-tabs user-tabs">
              <li class="nav-item"><a class="nav-link active" href="#user-timeline" data-toggle="tab">Datos personales</a></li>
              
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            <div class="tab-pane active" id="user-timeline">
              <div class="timeline-post">
                <div class="post-media">
                  <div class="content">
                    <h5>DATOS PERSONALES <button class="btn btn-sm btn-info" type="button" onclick="openModalPerfil();"> <i class="fas fa-pencil-alt" aria-hidden="true"></i> </button></h5>
                  </div>
                </div>
                <table class="table table-bordered">
            <tbody>
            <tr>
                <td>Usuario</td>
                <td><?= $_SESSION['userData']['user']?></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><?= $_SESSION['userData']['email']?></td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td><?= $_SESSION['userData']['nombre']?></td>
              </tr>
              <tr>
                <td>Apellido</td>
                <td><?= $_SESSION['userData']['apellidos']?></td>
              </tr>
              <tr>
                <td>Rol</td>
                <td><?= $_SESSION['userData']['nombrerol']?></td>
              </tr>
              <tr>
                <td>Empresa</td>
                <td><?= $_SESSION['userData']['empresa']?></td>
              </tr>
              <tr>
                <td>Fecha de Registro</td>
                <td><?= $_SESSION['userData']['fechaRegistro']?></td>
              </tr>
            </tbody>
          </table>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </main>
    <?php footerAdmin($data);?>