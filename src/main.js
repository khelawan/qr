_pdata = "";


function checkData(){
     _pdata = localStorage.getItem("scanData");

     _pdata = _pdata.split("Booking Id:");
     _pdata = _pdata[1];
     _pdata = _pdata.trim();
    

     _pdata = {
        "booking_id": _pdata
      }
      console.log(_pdata);
$.ajax({
    url:"https://xo3dnghur7.execute-api.us-east-2.amazonaws.com/dev/registration_app_user_check_in",
    type: "POST",
    data: JSON.stringify(_pdata),
    dataType: "json",
    crossDomain: true,
    success: function(data) {
        console.log(data);
        location.reload();
        localStorage.clear();
    }
});
}

function searchBoxData(){
    var searchbox = document.getElementById("searchBox").value;
    localStorage.setItem("searchData",searchbox);
         console.log(searchbox);
         _pdata = searchbox;
         checkData(_pdata);

}




var deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

async function install() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log(deferredPrompt)
    deferredPrompt.userChoice.then(function(choiceResult){

      if (choiceResult.outcome === 'accepted') {
      console.log('Your PWA has been installed');
    } else {
      console.log('User chose to not install your PWA');
    }
    deferredPrompt = null;

    });
  }
}



// display data in table 
display_data();
function display_data(){
    var datatable = [];
   
    $.ajax({
        url:"https://xo3dnghur7.execute-api.us-east-2.amazonaws.com/dev/registration_app_get_check_in_details?event_id=testkonfhubslsdeploymentb29912c5",
        type: "GET",
        //data: JSON.stringify(_pdata),
        //dataType: "json",
        crossDomain: true,
        success: function(data) {
            console.log(data);
            datatable = data;

        for(var i=0;i<datatable.length;i++){ 
           $("#dataTable").append(
            "<tr>"+
            "<td>"+[i+1]+"</td>"+
            "<td>"+datatable[i].name +"</td>"+
            "<td>"+datatable[i].organisation+"</td>"+
            "<td>"+datatable[i].email_id+"</td> "+
            "</tr>"
        );}
        }
    });
       

 
}


function closeModal(){
    $("#myModal").hide();
}