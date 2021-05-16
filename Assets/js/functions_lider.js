let tableLider;
let tableIndicadoresLider;
let divLoading = document.querySelector('#divLoading');





document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#tableLider')) {
        let idrol = document.querySelector('#idrol').value;
        if (idrol < 3) {
            //TABLA EVENTOS 
            tableLider = $('#tableLider').DataTable({
                "drawCallback": function() {

                    fntToggleEvento();

                },
                "aProcessing": true,
                "aServerSide": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                "ajax": {
                    "url": "" + base_url + "LibretaLider/getEventos",
                    "dataSrc": ""

                },
                "columns": [
                    { "data": "idlibreta" },
                    { "data": "lider" },
                    { "data": "empresa" },
                    { "data": "colaborador" },
                    { "data": "fechaEvento" },
                    { "data": "evento" },
                    { "data": "tipoevento" },
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

        } else {
            //TABLA EVENTOS 
            tableLider = $('#tableLider').DataTable({
                "drawCallback": function() {

                    fntToggleEvento();

                },
                "aProcessing": true,
                "aServerSide": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                "ajax": {
                    "url": "" + base_url + "LibretaLider/getEventos",
                    "dataSrc": ""

                },
                "columns": [
                    { "data": "idlibreta" },
                    { "data": "colaborador" },
                    { "data": "fechaEvento" },
                    { "data": "evento" },
                    { "data": "tipoevento" },
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
        }
    }




    //Eventos indicadores
    function format(d) {

        // `d` is the original data object for the row


        if (d.eventos.length == 0) {
            trHTML = "No hay eventos asociados a este Colaborador";

        } else {
            var trHTML =
                `
                       <table class="detailsTable">
                       <tr>
                           <th>id</th>
                           <th>Fecha</th>
                           <th>Evento</th>
                           <th>Tipo</th>
                       </tr>
                   `;
        }




        $.each(d.eventos, function(i, o) {

            trHTML +=
                `<tr>
                   <td>` + o.idlibreta + `</td>
                   <td>` + o.fechaEvento + `</td>
                   <td>` + o.eventoMod + `</td>
                   <td>` + o.tipoeventoNombre + `</td>
                 </tr>`;


        });



        return trHTML + '</table>';


    }

    //TABLA INDICADORES 
    tableIndicadoresLider = $('#tableIndicadoresLider').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"

        },
        "ajax": {
            "url": "" + base_url + "LibretaLider/getIndLibretaLider",
            "dataSrc": ""

        },
        "columns": [{
                "className": 'details',
                "orderable": false,
                "data": null,
                "defaultContent": '<div class="text-center fa fa-plus-circle" style="width:100%; color: #0093d2;"></div>'
            },
            { "data": "nombreCompleto" },
            { "data": "empresa" },
            { "data": "total" },
            { "data": "porcentajepos" },
            { "data": "porcentajeneg" },

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

    // Add event listener for opening and closing details
    $('#tableIndicadoresLider tbody').on('click', 'td.details', function() {
        var tr = $(this).closest('tr');
        var row = tableIndicadoresLider.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');

        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');


        }

        $(this).find('div').toggleClass("fa fa-plus-circle fas fa-minus-circle");
        if ($(this).find('div').hasClass("fas fa-minus-circle")) {
            $(this).find('div').css("color", "#dc3545");
        } else {
            $(this).find('div').css("color", "#0093d2");
        }

    });




    window.addEventListener("load", function() {
        setTimeout(() => {
            fntColUsuario();
            fntAlertCopy();

        }, 500);
    }, false);




    //Crear Evento
    if (document.querySelector("#formLider")) {

        let formLider = document.querySelector("#formLider");
        //document.querySelector('#listStatusLider').value = "1";


        formLider.onsubmit = function(e) {
            e.preventDefault();
            let srtFecha = document.querySelector('#txtFecha').value;
            let srtEvento = document.querySelector('#txtEvento').value;
            let intColaboradorid = document.querySelector('#listColaboradorid').value;
            let intStatusLider = document.querySelector('#listStatusLider').value;
            let srtEventoLength = document.querySelector('#txtEvento').value.length;


            if (srtFecha == '' || srtEvento == '' || intColaboradorid == '' || intStatusLider == '') {
                swal("Atención", "Todos los campos son obligatorios.", "error");
                return false;
            }

            /* if (srtEventoLength < 50) {
                 swal("Atención Evento", "El evento tiene que tener mínimo 50 caracteres", "error");
                 return false;
             }*/

            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url + 'LibretaLider/setEvento';
            let formData = new FormData(formLider);
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    let objData = JSON.parse(request.responseText);

                    if (objData.status) {

                        $('#modalFormLider').modal("hide");
                        formLider.reset();
                        swal("Usuarios", objData.msg, "success");
                        tableLider.ajax.reload();


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


//actualizar indicadores con filtro DATERANGE
if ($('.daterange').length != 0) {
    $(function() {
        setFechasDatepicker();
        $('input[name="daterange"]').daterangepicker({
            "showDropdowns": true,
            "autoApply": true,
            ranges: {
                'Hoy': [moment(), moment()],
                'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Últimos 7 Días': [moment().subtract(6, 'days'), moment()],
                'Últimos 30 Días': [moment().subtract(29, 'days'), moment()],
                'Este Mes': [moment().startOf('month'), moment().endOf('month')],
                'El Mes Pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Los Últimos 3 Meses': [moment().subtract(3, 'month'), moment()]
            },
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "OK",
                "cancelLabel": "Cancelar",
                "customRangeLabel": "Personalizar",
                "daysOfWeek": [
                    "D",
                    "L",
                    "M",
                    "X",
                    "J",
                    "V",
                    "S"
                ],
                "monthNames": [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Deciembre"
                ],
                "firstDay": 1
            },
            "maxDate": moment(),
            "opens": 'left'
        }, function(start, end, label) {

            let fechaInicio = start.format('YYYY-MM-DD');
            let fechaFin = end.format('YYYY-MM-DD');

            var formData = new FormData();
            formData.append("fechaInicio", fechaInicio);
            formData.append("fechaFin", fechaFin);

            divLoading.style.display = "flex";
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = base_url + 'LibretaLider/getIndLibretaLider';
            request.open("POST", ajaxUrl, true);
            request.send(formData);

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {

                    let objData = JSON.parse(request.responseText);
                    //TABLA INDICADORES 
                    tableIndicadoresLider.clear();
                    tableIndicadoresLider.rows.add(objData).draw();
                } //fin if

                divLoading.style.display = "none";

                return false;
            }



        });
    });
}


function setFechasDatepicker() {
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = base_url + 'LibretaLider/setFechasDatepicker';
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {

            let objData = JSON.parse(request.responseText);


            let fechaMin = objData.data[0].fechaMin;
            let fechaMax = objData.data[0].fechaMax;

            if ($('.daterange')) {
                $('.daterange').data('daterangepicker').setStartDate(fechaMin);
                $('.daterange').data('daterangepicker').setEndDate(fechaMax);
            }


        } //fin if



        return false;
    }

}


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

//show/hide eventos
function fntToggleEvento() {

    if (document.querySelector('#idrol').value < 3) {
        var elemento = $("table tbody tr").find("td:eq(5)");
    } else {
        var elemento = $("table tbody tr").find("td:eq(3)");
    }
    for (var i = 0; i < elemento.length; i++) {
        if (!elemento[i].classList.contains('elipsis'))
            elemento[i].className += "elipsis";
    }

    $(elemento).click(function() {
        $(this).toggleClass('elipsis');
    });
}



function fntColUsuario() {
    if (document.querySelector("#listColaboradorid")) {
        let ajaxUrl = base_url + 'LibretaLider/getSelectCols/';
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        request.open("GET", ajaxUrl, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                document.querySelector("#listColaboradorid").innerHTML = request.responseText;
                //document.querySelector("#listRolid").value = 1;
                $('#listColaboradorid').selectpicker('refresh');

            }
        }

    }

}


//Editar evento
function fntEditEvento(idlibreta) {

    document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
    document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    document.querySelector('#btnText').innerHTML = "Actualizar";
    document.querySelector('#titleModal').innerHTML = "Actualizar Evento";

    let ajaxUrl = base_url + 'LibretaLider/getEvento/' + idlibreta;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    request.open("GET", ajaxUrl, true);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            let objData = JSON.parse(request.responseText);

            if (objData.status) {

                fechaEventocorregida = moment(objData.data.fecha).format('YYYY-MM-DD');
                document.querySelector('#txtFecha').value = fechaEventocorregida;
                document.querySelector('#idLibreta').value = objData.data.idlibreta;
                document.querySelector("#txtEvento").value = objData.data.evento;
                document.querySelector("#listColaboradorid").value = objData.data.colaboradorid;
                document.querySelector("#listStatusLider").value = objData.data.tipoevento;
                $("#listColaboradorid").selectpicker("render");
                $("#listStatusLider").selectpicker("render");


            }

        }

        $('#modalFormLider').modal('show');;

    }

}

//borrar evento
function fntDelEvento(idlibreta) {


    swal({
        title: "Eliminar Evento",
        text: "¿Realmente quiere eliminar el Evento?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm) {

        if (isConfirm) {
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url + 'LibretaLider/delEvento';
            var strData = "idlibreta=" + idlibreta;
            request.open("POST", ajaxUrl, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var objData = JSON.parse(request.responseText);
                    if (objData.status) {
                        swal("Eliminar", objData.msg, "success");
                        tableLider.ajax.reload();

                    } else {
                        swal("Error", objData.msg, "error");
                    }
                }
            }

        }
    });

}


function openModal() {

    $('#listStatusLider').selectpicker('refresh');
    $('#listColaboradorid').selectpicker('refresh');
    document.querySelector('#idLibreta').value = "";
    document.querySelector('.modal-header').classList.replace("headerUpdate", "headerRegister");
    document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-primary");
    document.querySelector('#btnText').innerHTML = "Guardar";
    document.querySelector('#titleModal').innerHTML = "Nuevo Evento";
    document.querySelector("#formLider").reset();
    $('#modalFormLider').modal('show');

    let currentDate = moment().format('YYYY-MM-DD');
    document.querySelector('#txtFecha').value = currentDate;

}