<!-- Modal -->
<div class="modal fade" id="modalDesarrolloLider" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header headerUpdate">
                <h5 class="modal-title" id="titleModal">Añade Documentos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <div class="tile">
                    <div class="tile-body">
                        <form id="formDesarrolloLider" name="formDesarrolloLider" class="form-horizontal" autocomplete="off">

                            <p class="text-primary">Todos los campos (<span class="required">*</span>) son obligatorios</p>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="txtUser">Nombre Documento<span class="required">*</span></label>
                                    <input class="form-control" id="txtDoc" name="txtDoc" type="text" value="" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="txtUser">Descripción<span class="required">*</span></label>
                                    <input class="form-control" id="txtDesc" name="txtDesc" type="text" value="" required="">
                                </div>
                            </div>
                    </div>
                    <div class="tile-footer">
                        <button id="btnActionForm" class="btn btn-info" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i> <span id="btnText">Añadir</span> </button>&nbsp;&nbsp;&nbsp;
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