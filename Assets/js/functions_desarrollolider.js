let tableDesarrollo;

document.addEventListener('DOMContentLoaded', function() {

    var previewNode = document.querySelector("#template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);


    //TABLA COLAB 
    tableDesarrollo = $('#tableDesarrollo').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "ajax": {
            "url": "" + base_url + "DesarrolloLider/getDocs",
            "dataSrc": ""

        },
        "columns": [
            { "data": "iddesarrollolider" },
            { "data": "lider" },
            { "data": "empresa" },
            { "data": "filename" },
            { "data": "fechacreacion" },
            { "data": "horacreacion" },
            { "data": "version" },
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


    //DROPZONE UPLOAD

    Dropzone.autoDiscover = false;

    $(".subirdoc").dropzone({
        url: base_url + 'DesarrolloLider/setFile/',
        createImageThumbnails: false,
        maxFileSize: 10,
        acceptedFiles: ".xlsx, .xls, .csv",
        previewsContainer: "#previews",
        previewTemplate: previewTemplate,

        init: function() {
            this.on("success", function(file, xhr) {
                setTimeout(() => {

                    let objData = JSON.parse(xhr);
                    swal(objData.tipo, objData.msg, "success");
                    $(".dz-complete").remove();
                    tableDesarrollo.ajax.reload();

                }, 500);

            });

            this.on("error", function(file, xhr) {
                setTimeout(() => {

                    let objData = JSON.parse(xhr);
                    swal("Documento", objData.msg, "error");
                    $(".dz-complete").remove();
                    tableDesarrollo.ajax.reload();

                }, 500);

            });
        }

    });

}, false); //fin DOMCONTENT EVENT


window.addEventListener("load", function() {
    setTimeout(() => {

        fntAlertCopy();

    }, 500);
}, false);

//alert copy
function fntAlertCopy() {
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

//borrar evento
function fntDelDoc(iddesarrollolider) {


    swal({
        title: "Eliminar Documento",
        text: "¿Realmente quiere eliminar el Documento?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm) {

        if (isConfirm) {
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + 'DesarrolloLider/delDoc';
            var strData = "iddesarrollolider=" + iddesarrollolider;
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal("Eliminar", objData.msg, "success");
                        tableDesarrollo.ajax.reload();

                    } else {
                        swal("Error", objData.msg, "error");
                    }
                }
            }

        }
    });

}




function openModal() {


    document.querySelector("#formDesarrolloLider").reset();
    $('#modalDesarrolloLider').modal('show');



}