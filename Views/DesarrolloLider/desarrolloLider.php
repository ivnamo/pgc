<?php

headerAdmin($data);
//getModal('modalDesarrolloLider',$data);

?>

<main class="app-content">
  <?php

  //dep($_SESSION);

  ?>
  <div class="app-title">
    <div>
      <h1><i class="far fa-clipboard"></i> <?php echo  $data['page_title'] ?>
       

        <?php if ($_SESSION['permisosMod']['w']) { ?>

          <button class="btn btn-primary subirdoc" title="Sube o actualiza un documento" type="button"><i class="fa fa-retweet"></i>Upload/Update</button>
          <select class="form-control show-tick" data-live-search="true" id="listDesarrolloid" name="listDesarrolloid" required=""></select>



          <div class="dropzone-previews div-table"></div>

          <!-- HTML heavily inspired by http://blueimp.github.io/jQuery-File-Upload/ -->
          <div class="table table-striped" class="files" id="previews">
            <div id="template" class="file-row">
              <!-- This is used as the file preview template -->
              <div>
                <span class="preview"><img data-dz-thumbnail /></span>
              </div>
              <div>
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                  <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                </div>
              </div>
            </div>
          </div>

        <?php } ?>
      </h1>
    </div>
    <ul class="app-breadcrumb breadcrumb">
      <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
      <li class="breadcrumb-item"><a href="<?= base_url(); ?>desarrolloLider"><?php echo  $data['page_title'] ?></a></li>
    </ul>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="table-responsive">
            <table class="table table-hover table-bordered" id="tableDesarrollo">
              <thead>
                <tr>

                  <th>Id</th>
                  <th>Líder</th>
                  <th>Empresa</th>
                  <th>Documento</th>
                  <th>Fecha modificación</th>
                  <th>Hora modificación</th>
                  <th>Versión</th>
                  <th>Acciones</th>

                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                  <td>CARGANDO...</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>
<?php footerAdmin($data); ?>