var cookieuser;
var activecarona;
var timeout;
var sizechat=0;
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
         var email=document.getElementById("txtemail").value;
         var pwd=document.getElementById("txtsenha").value;         
        
        $.ajax({url: "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/login.asp?u="+email+"&p="+pwd,cache: false}).done(function(html){
            if(html=='nok'){
                alert("usuário ou senha inválidos");                
                document.getElementById("txtsenha").value="";         
            }else{
                intel.xdk.cache.setCookie("cookieuser",html,15);
                cookieuser=intel.xdk.cache.getCookie("cookieuser");        
                document.getElementById("txtemail").value="";
                document.getElementById("txtsenha").value="";         
                activate_page("#tipo");                 
            }        
        });
            
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
        
        $(document).on("click", ".uib_w_45", function(evt)
        {
         clearInterval(timeout);
         activate_page("#tipo"); 
         sizechat=0;
        });
        $(document).on("click", ".uib_w_41", function(evt)
        {
            postchat(document.getElementById("txtchat").value);
        });
        $(document).on("click", ".uib_w_48", function(evt)
        {
         activate_subpage("#minhascaronassub"); 
        });
        $(document).on("click", ".uib_w_49", function(evt)
        {
         activate_subpage("#minhascaronassub"); 
        });
}
 $(document).ready(register_event_handlers);
})();

	function getCaronas(){        
		$( "#container_caronas" ).load( "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getcaronas_2.asp?u="+cookieuser );      
        //$( "#container_caronas" ).load( "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/teste.asp" );      
    }

function getMinhasCaronas(user){		
        $( "#div_minhas_caronas" ).load( "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getminhascaronas_2.asp?u="+user);      
    }

function oferececarona(user,de,para,info,hora){        
    var data={u:user,i:info,d:de,p:para,h:hora};
    $.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/oferececarona_2.asp",type: "POST",data:data,cache: false}).done(function(html){
            //alert(html);        
        });
    
}

function openchat(carona){
    activecarona=carona;    
    $( "#txt_chat" ).load( "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/chat.asp?c="+carona+"&u="+cookieuser);
    location.href='#bottomom';
    timeout = setInterval(function(){
        intel.xdk.notification.showBusyIndicator();
        $( "#txt_chat" ).load( "http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/chat.asp?c="+carona+"&u="+cookieuser);     
            if(sizechat==0||document.getElementById("hidsizechat").value>sizechat){                              
                location.href='#bottomom';
                sizechat=document.getElementById("hidsizechat").value;                
            }
        intel.xdk.notification.hideBusyIndicator();        
    }, 1500);
    activate_subpage("#chatsub");
}

function postchat(msg){
        //alert("http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/postchat_2.asp?u="+cookieuser+"&c="+activecarona+"&msg="+msg);
        var data={u:cookieuser,c:activecarona,msg:msg};       
        $.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/postchat_2.asp",type: "POST",data:data,cache: false}).done(function(html){
            //document.getElementById("txtchat").value="";        
        });
        document.getElementById("txtchat").value="";        
}

function applycarona(carona){
    intel.xdk.notification.showBusyIndicator();    
    $.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/applycarona_2.asp?u="+cookieuser+"&c="+carona,cache: false}).done(function(html){
            //document.getElementById("txtchat").value="";        
        });    
        setTimeout(function(){         
        getMinhasCaronas(cookieuser);    
    activate_subpage("#minhascaronassub");    
        },3000);
    intel.xdk.notification.hideBusyIndicator();
}

function map(carona){
        
        initialize();
        activate_subpage("#pgmapsub");        
}

function initialize(){    
          var map;
            alert("mapa");
          var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
          };
          map = new google.maps.Map(document.getElementById('mapcontainer'),mapOptions);
        }