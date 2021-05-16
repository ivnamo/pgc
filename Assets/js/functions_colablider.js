let tableColab;
let divLoading = document.querySelector('#divLoading');

document.addEventListener('DOMContentLoaded', function() {

    //TABLA COLAB 
    tableColab = $('#tableColab').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "ajax": {
            "url": "" + base_url + "ColabLider/getColabs",
            "dataSrc": ""

        },
        "columns": [
            { "data": "idcolaborador" },
            { "data": "colaborador" },
            { "data": "lider" },
            { "data": "empresa" },
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
        "autoWidth": false,
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [
            [0, "desc"]
        ]
    });


    window.addEventListener("load", function() {
        setTimeout(() => {

            fntLideres()


        }, 500);
    }, false);




    //Crear Colaborador
    if (document.querySelector("#formColabLider")) {

        let formColabLider = document.querySelector("#formColabLider");
        formColabLider.onsubmit = function(e) {
            e.preventDefault();
            let srtNombre = document.querySelector('#txtNombre').value;
            let srtApellido = document.querySelector('#txtApellido').value;

            if (srtNombre == '' || srtApellido == '') {
                swal("Atención", "Todos los campos son obligatorios.", "error");
                return false;
            }

            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url + 'ColabLider/setColab';
            let formData = new FormData(formColabLider);
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);
                    if (objData.status) {

                        $('#modalFormColabLider').modal("hide");
                        formColabLider.reset();
                        swal("Usuarios", objData.msg, "success");
                        tableColab.ajax.reload();


                    } else {
                        swal("Error", objData.msg, "error");
                    }

                }

                divLoading.style.display = "none";

                return false;
            }

        }
    }


}, false); //fin DOMCONTENT EVENT

function fntLideres() {
    if (document.querySelector("#listLiderid")) {
        let ajaxUrl = base_url + 'ColabLider/getSelectLideres/';
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        request.open("GET", ajaxUrl, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                document.querySelector("#listLiderid").innerHTML = request.responseText;
                //document.querySelector("#listRolid").value = 1;
                $('#listLiderid').selectpicker('refresh');

            }
        }

    }

}

//Editar colaborador
function fntEditColab(idcolaborador) {

    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";
    document.querySelector('#titleModal').innerHTML = "Actualizar Colaborador";

    let ajaxUrl = base_url + 'ColabLider/getColab/' + idcolaborador;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);
            if (objData.status) {

                document.querySelector('#idcolaborador').value = objData.data.idcolaborador;
                document.querySelector("#txtNombre").value = objData.data.nombre;
                document.querySelector("#txtApellido").value = objData.data.apellido;
                document.querySelector("#listStatus").value = objData.data.status;
                $("#listStatus").selectpicker("render");



            }

        }

        $('#modalFormColabLider').modal('show');

    }

}


//borrar evento
function fntDelColab(idcolaborador) {

    swal({
        title: "Eliminar Colaborador",
        text: "¿Realmente quiere eliminar este colaborador?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm) {

        if (isConfirm) {
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + 'ColabLider/delColab';
            var strData = "idcolaborador=" + idcolaborador;
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal("Eliminar", objData.msg, "success");
                        tableColab.ajax.reload();
                    } else {
                        swal("Error", objData.msg, "error");
                    }
                }
            }

        }
    });

}




function openModal() {

    $('#listStatus').selectpicker('refresh');
    $('#listLiderid').selectpicker('refresh');
    document.querySelector('#idcolaborador').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Colaborador";


    document.querySelector("#formColabLider").reset();
    $('#modalFormColabLider').modal('show');


}