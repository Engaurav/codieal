console.log("hello");
//Check Password and confirm Password Equal

$(document).ready(function(){
    $("#cnf_psd").keyup(function(){
        if($('#psd').val()!=$('#cnf_psd').val()){
            $("#message").html("Password do not match.!!");
            $("#message").css("color","red");
        }
        else{
            $("#message").html("Password Match!!");
            $("#message").css("color","green");
        }
    });
});