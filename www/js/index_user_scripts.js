(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
         $(document).on("click", ".uib_w_3", function(evt)
        {
        $.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/teste.asp"}).done(function( data ) {
          // alert(data);
        });	 
         intel.xdk.cache.setCookie("cookieuser",333,15);
         activate_page("#tipo"); 
        });
        $(document).on("click", ".uib_w_5", function(evt)
        {
            activate_page("#quero_carona"); 
            intel.xdk.notification.showBusyIndicator();
            getCaronas();
            intel.xdk.notification.hideBusyIndicator();
            
        });
        $(document).on("click", "#quero_carona_voltar", function(evt)
        {
         activate_subpage("#tiposub"); 
        });             
        $(document).on("click", "#reload", function(evt)
        {
            intel.xdk.notification.showBusyIndicator();
                getCaronas();
            intel.xdk.notification.hideBusyIndicator();
        });
        $(document).on("click", ".uib_w_4", function(evt)
        {
         activate_subpage("#cadastrosub"); 
        });
        $(document).on("click", ".uib_w_12", function(evt)
        {
         activate_subpage("#mainsub"); 
        });
        $(document).on("click", "#btn_sair", function(evt)
        {
         intel.xdk.cache.removeCookie("cookieuser");
         cookieuser=null;
         activate_subpage("#mainsub"); 
        });
        $(document).on("click", "#volta_oferece", function(evt)
        {
         activate_page("#tipo"); 
        });
        $(document).on("click", "#ofereco_carona", function(evt)
        {
         activate_subpage("#ofereco_caronasub"); 
        });
        
        $(document).on("click", ".uib_w_29", function(evt)
        {
         activate_page("#tipo"); 
        });
        $(document).on("click", ".uib_w_22", function(evt)
        {
         activate_page("#ofereco"); 
        });
        $(document).on("click", ".uib_w_24", function(evt)
        {
         activate_subpage("#tiposub"); 
        });
        $(document).on("click", ".uib_w_34", function(evt)
        {
         activate_subpage("#tiposub"); 
        });
        $(document).on("click", ".uib_w_35", function(evt)
        {
             intel.xdk.notification.showBusyIndicator();
                getMinhasCaronas(cookieuser);
            intel.xdk.notification.hideBusyIndicator(); 
        });
        $(document).on("click", ".uib_w_31", function(evt)
        {
         activate_subpage("#minhascaronassub"); 
            intel.xdk.notification.showBusyIndicator();
                getMinhasCaronas(cookieuser);
            intel.xdk.notification.hideBusyIndicator();
        });
        $(document).on("click", "#btnoferecece", function(evt)
        {
            var de=document.getElementById("txtde").value;
            var para=document.getElementById("txtpara").value;
            var info=document.getElementById("txtinfo_2").value;
            var hora=document.getElementById("txthora").value+':00';
            intel.xdk.notification.showBusyIndicator();
                //alert(de+para+info+hora);
                oferececarona(cookieuser,de,para,info,hora);
            intel.xdk.notification.hideBusyIndicator();
            
            document.getElementById("txtde").value="";
            document.getElementById("txtpara").value="";
            document.getElementById("txtinfo_2").value="";
            document.getElementById("txthora").value="";
            
            
            activate_subpage("#minhascaronassub"); 
            intel.xdk.notification.showBusyIndicator();
                getMinhasCaronas(cookieuser);
            intel.xdk.notification.hideBusyIndicator();
        });
}
 $(document).ready(register_event_handlers);
})();

	function getCaronas(){
		$.ajax({crossDomain: true,cache: false,contentType:"text/html", url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getcaronas.asp"}).done(function( data ) {
            alert(data+'');
            document.getElementById("container_caronas").innerHTML=data;
        });	
        
        /*
        var getRemoteDataEvent=function(event)
        {
                if(event.success==false)
                   {
                      alert("error obtaining remote data");
                   }
                else
                   {
                      alert("success: " + event.response);
                   }
        }
        document.addEventListener("intel.xdk.device.remote.data",getRemoteDataEvent,false);
        
        var parameters = new intel.xdk.Device.RemoteDataParameters();
        parameters.url = "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getcaronas.asp";        

        intel.xdk.device.getRemoteDataExt(parameters);        
        */
        
       // $( "#container_caronas" ).load( "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getcaronas.asp" );
        
    }

function getMinhasCaronas(user){
		$.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getminhascaronas.asp?u="+user}).done(function( data ) {
            document.getElementById("div_minhas_caronas").innerHTML=data;
        });	                       
    }

function oferececarona(user,de,para,info,hora){
    var uurl= "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/oferececarona.asp?u="+user+"&i="+info+"&d="+de+"&p="+para+"&h="+hora;
   // alert(uurl);
    $.ajax({url:uurl});
}