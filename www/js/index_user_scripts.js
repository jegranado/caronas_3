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
        $(document).on("click", ".uib_w_20", function(evt)
        {
            
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
         activate_subpage("#mainsub"); 
        });
}
 $(document).ready(register_event_handlers);
})();

	function getCaronas(){
		$.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getcaronas.asp"}).done(function( data ) {
            document.getElementById("container_caronas").innerHTML=data;
        });	                       
    }