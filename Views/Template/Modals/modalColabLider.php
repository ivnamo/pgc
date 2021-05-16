<!-- Modal -->
<div class="modal fade" id="modalFormColabLider" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header headerRegister">
        <h5 class="modal-title" id="titleModal">Nuevo Colaborador</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="tile">
          <div class="tile-body">
            <form id="formColabLider" name="formColabLider" class="form-horizontal">
              <input type="hidden" id="idcolaborador" name="idcolaborador" value="">
              <p class="text-primary">Todos los campos (<span class="required">*</span>) son obligatorios</p>


              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="txtNombre">Nombre<span class="required">*</span></label>
                  <input class="form-control" id="txtNombre" name="txtNombre" type="text" required="">
                </div>
                <div class="form-group col-md-6">
                  <label for="txtApellido">Apellido<span class="required">*</span></label>
                  <input autocomplete="off" class="form-control" id="txtApellido" name="txtApellido" type="text" required="">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="listLiderid">Líder<span class="required">*</span></label>
                  <select class="form-control show-tick" data-live-search="true" id="listLiderid" name="listLiderid" required=""></select>
                </div>
                <div class="form-group col-md-6">
                  <label for="listStatus">Estado<span class="required">*</span></label>
                  <select class="form-control selectpicker show-tick" id="listStatus" name="listStatus" required="">
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
              </div>


              <div class="tile-footer">
                <button id="btnActionForm" class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i> <span id="btnText">Guardar</span> </button>&nbsp;&nbsp;&nbsp;
                <a class="btn btn-danger" type="button" href="#" data-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>