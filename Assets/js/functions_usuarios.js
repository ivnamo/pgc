let tableUsuarios;
let divLoading = document.querySelector('#divLoading');
document.addEventListener('DOMContentLoaded', function() {

    tableUsuarios = $('#tableUsuarios').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "ajax": {
            "url": "" + base_url + "Usuarios/getUsuarios",
            "dataSrc": ""

        },
        "columns": [
            { "data": "idpersona" },
            { "data": "nombre" },
            { "data": "apellidos" },
            { "data": "empresa" },
            { "data": "nombrerol" },
            { "data": "status" },
            { "data": "options" }
        ],
        "dom": 'lBfrtip',
        "buttons": [{
            "extend": "copyHtml5",
            "text": "<i class='far fa-copy'></i> Copiar",
            "titleAttr": "Copiar",
            "className": "btn btn-secondary"

        }, {
            "extend": "excelHtml5",
            "text": "<i class='fas fa-file-excel'></i> Excel",
            "titleAttr": "Exportar a Excel",
            "className": "btn btn-success"
        }, {
            "extend": "pdfHtml5",
            "text": "<i class='fas fa-file-pdf'></i> PDF",
            "titleAttr": "Exportar a PDF",
            "className": "btn btn-danger"
        }, {
            "extend": "csvHtml5",
            "text": "<i class='fas fa-file-csv'></i> CSV",
            "titleAttr": "Exportar a CSV",
            "className": "btn btn-info"
        }],
        "responsive": true,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [
            [0, "desc"]
        ]
    });

    //Crear usuario
    if (document.querySelector("#formUsuario")) {

        let formUsuario = document.querySelector("#formUsuario");
        formUsuario.onsubmit = function(e) {
            e.preventDefault();
            let srtUser = document.querySelector('#txtUser').value;
            let srtEmail = document.querySelector('#txtEmail').value;
            let srtNombre = document.querySelector('#txtNombre').value;
            let srtApellido = document.querySelector('#txtApellido').value;
            let srtEmpresa = document.querySelector('#txtEmpresa').value;
            let intTipo = document.querySelector('#listRolid').value;
            let srtUserLength = document.querySelector('#txtUser').value.length;


            if (srtUser == '' || srtEmail == '' || srtNombre == '' || srtEmpresa == '' || srtApellido == '' || intTipo == '') {
                swal("Atención", "Todos los campos son obligatorios.", "error");
                return false;
            }

            if (srtUserLength != 3) {
                swal("Atención INICIALES usuario", "El usuario deben ser 3 iniciales.", "error");
                return false;
            }

            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url + 'Usuarios/setUsuario';
            let formData = new FormData(formUsuario);
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {

                        $('#modalFormUsuario').modal("hide");
                        formUsuario.reset();
                        swal("Usuarios", objData.msg, "success");
                        tableUsuarios.ajax.reload();

                    } else {
                        swal("Error", objData.msg, "error");
                    }

                }

                divLoading.style.display = "none";
                return false;
            }

        }
    }



    //Actualizar perfil
    if (document.querySelector("#formPerfil")) {
        fntInputFile();
        let formPerfil = document.querySelector("#formPerfil");
        formPerfil.onsubmit = function(e) {
            e.preventDefault();
            let srtUser = document.querySelector('#txtUser').value;
            let srtUserLength = document.querySelector('#txtUser').value.length;
            let srtNombre = document.querySelector('#txtNombre').value;
            let srtApellido = document.querySelector('#txtApellido').value;
            let strPassword = document.querySelector('#txtPassword').value;
            let strPasswordConfirm = document.querySelector('#txtPasswordConfirm').value;


            if (srtUser == '' || srtNombre == '' || srtApellido == '') {
                swal("Atención", "Todos los campos son obligatorios.", "error");
                return false;
            }

            if (srtUserLength != 3) {
                swal("Atención INICIALES usuario", "El usuario deben ser 3 iniciales.", "error");
                return false;
            }


            if (strPassword != "" || strPasswordConfirm != "") {
                if (strPassword != strPasswordConfirm) {
                    swal("Atención", "Las contraseñas no son iguales.", "error");
                    return false;
                }

                if (strPassword.length < 5) {
                    swal("Atención", "La contraseña debe ser de mínimo 5 caracteres", "error");
                    return false;
                }

            }
            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url + 'Usuarios/putPerfil';
            let formData = new FormData(formPerfil);
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        $('modalFormPerfil').modal('hide');
                        swal({
                            title: "",
                            text: objData.msg,
                            type: "success",
                            confirmButtonText: "Aceptar",
                            closeOnConfirm: true,
                        }, function(isConfirm) {
                            if (isConfirm) {
                                location.reload();
                            }
                        });

                    } else {
                        swal("Error", objData.msg, "error");
                    }

                }
                divLoading.style.display = "none";
                return false;
            }

        }
    }
}, false);






window.addEventListener("load", function() {
    setTimeout(() => {
        fntRolesUsuario();
        fntAlertCopy();


    }, 500);
}, false);


//alert copy
function fntAlertCopy() {
    if (document.querySelector(".buttons-copy")) {
        let botonCopiar = document.querySelector(".buttons-copy");
        botonCopiar.addEventListener("click", function() {
            swal({
                title: "Copiado",
                text: "",
                type: "success",
                timer: 1000,
                showConfirmButton: false
            });

        });
    }

}

//avatar
function fntInputFile() {

    let inputUploadfile = document.querySelectorAll(".inputUploadfile");
    inputUploadfile.forEach(function(inputUploadfile) {
        inputUploadfile.addEventListener('change', function() {
            let parentId = this.parentNode.getAttribute('id');
            let idFile = this.getAttribute('id');
            let uploadFoto = document.querySelector("#" + idFile).value;
            let fileImg = document.querySelector("#" + idFile).files;
            let prevImg = document.querySelector("#" + parentId + " .prevImage");
            let nav = window.URL || window.webkitURL;


            if (uploadFoto != "") {
                let type = fileImg[0].type;
                let name = fileImg[0].name;
                if (type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png') {
                    prevImg.innerHTML = "Archivo con formato no válido.";
                    uploadFoto.value = "";
                    return false;
                } else {

                    let objeto_url = nav.createObjectURL(this.files[0]);
                    prevImg.innerHTML = `<img class = "loading" src="${base_url}Assets/images/loading.svg" alt="">`;
                    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    let ajaxUrl = base_url + 'Usuarios/setImageAvatar/';
                    let formData = new FormData();
                    formData.append("foto", this.files[0]);
                    request.open("POST", ajaxUrl, true);
                    request.send(formData);
                    request.onreadystatechange = function() {
                        if (request.readyState == 4 && request.status == 200) {
                            let objData = JSON.parse(request.responseText);

                            if (objData.status) {
                                prevImg.innerHTML = `<img src="${objeto_url}">`;


                            } else {
                                swal("Error", objData.msg, "error");
                            }
                        }
                    }

                }
            }
        });
    });

}



function fntRolesUsuario() {
    if (document.querySelector("#listRolid")) {
        let ajaxUrl = base_url + 'Roles/getSelectRoles/';
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        request.open("GET", ajaxUrl, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                document.querySelector("#listRolid").innerHTML = request.responseText;
                //document.querySelector("#listRolid").value = 1;
                $('#listRolid').selectpicker('refresh');

            }
        }

    }

}

function fntViewUsuario(idpersona) {
    let ajaxUrl = base_url + 'Usuarios/getUsuario/' + idpersona;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            console.log(objData);
            if (objData.status) {
                let estadoUsuario = objData.data.status == 1 ?
                    '<span class="badge badge-success">Activo</span>' :
                    '<span class="badge badge-danger">Inactivo</span>';
                document.querySelector("#celUser").innerHTML = objData.data.user;
                document.querySelector("#celEmail").innerHTML = objData.data.email;
                document.querySelector("#celNombre").innerHTML = objData.data.nombre;
                document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
                document.querySelector("#celEmpresa").innerHTML = objData.data.empresa;
                document.querySelector("#celRol").innerHTML = objData.data.nombrerol;
                document.querySelector("#celEstatus").innerHTML = estadoUsuario;
                document.querySelector("#celFechaReg").innerHTML = objData.data.fechaRegistro;
                $('#modalViewUser').modal('show');



            } else {
                swal("Error", objData.msg, "error");
            }

        }
    }





}

function fntEditUsuario(idpersona) {

    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";
    document.querySelector('#titleModal').innerHTML = "Actualizar Usuario";

    let ajaxUrl = base_url + 'Usuarios/getUsuario/' + idpersona;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if (objData.status) {
                document.querySelector("#idUsuario").value = objData.data.idpersona;
                document.querySelector("#txtUser").value = objData.data.user;
                document.querySelector("#txtEmail").value = objData.data.email;
                document.querySelector("#txtNombre").value = objData.data.nombre;
                document.querySelector("#txtApellido").value = objData.data.apellidos;
                document.querySelector("#listRolid").value = objData.data.idrol;
                document.querySelector("#listStatus").value = objData.data.status;
                $("#listRolid").selectpicker("render");
                $("#listStatus").selectpicker("render");


            }

        }

        $('#modalFormUsuario').modal('show');
    }

}

function fntDelUsuario(idpersona) {

    swal({
        title: "Eliminar Usuario",
        text: "¿Realmente quiere eliminar el Usuario?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm) {

        if (isConfirm) {
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url + 'Usuarios/delUsuario/';
            let strData = "idUsuario=" + idpersona;
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal("Eliminar", objData.msg, "success");
                        tableUsuarios.ajax.reload(function() {
                            fntRolesUsuario();

                        });
                    } else {
                        swal("Error", objData.msg, "error");
                    }
                }
            }

        }
    });

}




function openModal() {

    document.querySelector('#idUsuario').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
    document.querySelector("#formUsuario").reset();
    $('#modalFormUsuario').modal('show');

}



function openModalPerfil() {
    $('#modalFormPerfil').modal('show');

}