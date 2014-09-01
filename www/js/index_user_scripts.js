var cookieuser;
var activecarona;
var timeout;
var sizechat=0;
var latme;
var lonme;
var obmap;
var mkinterval;
var arrmarkers;
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
        
        $(document).on("click", "#voltmap", function(evt)
        {
         activate_subpage("#minhascaronassub"); 
         clearInterval(mkinterval);
        });
        $(document).on("click", "#btncadastrar", function(evt)
        {
        /* your code goes here */ 
            var ok=true;
            
            if(ok&&document.getElementById("txtcadnome").value.replace(" ","")==""){alert("Nome não pode estar em branco");ok=false;}
            if(ok&&document.getElementById("txtcademail").value.replace(" ","")==""){alert("Email não pode estar em branco");ok=false;}
            if(ok&&document.getElementById("txtcadcelular").value.replace(" ","")==""){alert("Celular não pode estar em branco");ok=false;}
            if(ok&&document.getElementById("txtcadsenha").value.replace(" ","")==""){alert("Senha não pode estar em branco");ok=false;}            
             if(ok&&document.getElementById("txtcadsenha").value!=document.getElementById("txtcadsenhab").value){
                alert("A senha e sua confirmação precisam ser idênticas.");
                ok=false;
            }
            
            if(ok&&!document.getElementById("chkprometo").checked){
                alert("Você precisa prometer que não vai usar este aplicativo dirigindo para prosseguir.");
                ok=false;
            }
            
            var data={
                nome:document.getElementById("txtcadnome").value,
                email:document.getElementById("txtcademail").value,
                celular:document.getElementById("txtcadcelular").value,
                senha:document.getElementById("txtcadsenha").value
            };
            var okk=true;
            if(ok){
            $.get("http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/cadastra.asp",data,function(retorno){
                if(retorno.indexOf("jaexistente")>-1){
                    alert("Email já cadastrado. Tente novamente.");
                    okk=false;
                }
                
            });
            
            }
            if(okk){                document.getElementById("txtemail").value=document.getElementById("txtcademail").value;                            
                activate_subpage("#mainsub");   
                alert("Cadastro realizado com sucesso!");                      
                document.getElementById("txtcadnome").value="";
                document.getElementById("txtcademail").value="";
                document.getElementById("txtcadcelular").value="";
                document.getElementById("txtcadsenha").value="";
            }
            
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
        //alert(carona);
        initialize();
        //alert(document.getElementById("mapcontainer").style.width);
        document.getElementById("mapcontainer").style.width = screen.width + "px";
        document.getElementById("mapcontainer").style.height = screen.height + "px";
        mkinterval=setInterval(
        function(){
         var data={c:carona};       
        $.ajax({url:"http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/getposition.asp?c="+carona,cache: false}).done(function(html){
            //alert(html);
            setMarkers(html);
        });      
        }
        ,3500);
        
        activate_subpage("#pgmapsub"); 
}

function initialize(){    
          
           // alert("mapa");
          var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(latme, lonme),
            disableDefaultUI: true
          };
          obmap = new google.maps.Map(document.getElementById('mapcontainer'),mapOptions);
}

function locateme(){
     var suc = function(p){
        //alert("geolocation success");
        if (p.coords.latitude != undefined)
        {
            latme = p.coords.latitude;
            lonme = p.coords.longitude;
            var data={u:cookieuser,lat:latme,lon:lonme};
            $.post("http://ec2-54-191-186-213.us-west-2.compute.amazonaws.com:8033/ws/postlocation.asp",data);
        }

    };
    
    setInterval(function(){
    intel.xdk.geolocation.getCurrentPosition(suc,null);
    },3000);
} 

function setMarkers(data){
    arrda=null;
    var arrda = data.split("//");
    var aux;
    for(x in arrda){
        aux=arrda[x].split("|");
        posi = new google.maps.LatLng(aux[2],aux[3]);
        
        if(aux[1]==1){
            image="./images/car.png";
        }else{
            image="./images/person.png";
        }
        
        arrmarkers=new google.maps.Marker({
        position: posi,
        map: obmap,
        title:aux[0],
        icon: image
        });
    }
}