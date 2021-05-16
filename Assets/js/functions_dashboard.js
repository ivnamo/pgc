document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector(".indicadorUsuarios")) {
        let indicadorUsuarios = document.querySelector(".indicadorUsuarios");

        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = base_url + 'Dashboard/indicadorUsuarios';
        request.open("GET", ajaxUrl, true);
        request.send();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {


                let objData = JSON.parse(request.responseText);
                if (objData.status) {

                    indicadorUsuarios.innerHTML = '<b>' + objData.data.count + '</b>';

                } else {
                    console.log("error");
                }

            }

            divLoading.style.display = "none";

            return false;
        }

    }







}, false);