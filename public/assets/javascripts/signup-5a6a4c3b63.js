console.log("hello"),$(document).ready((function(){$("#cnf_psd").keyup((function(){$("#psd").val()!=$("#cnf_psd").val()?($("#message").html("Password do not match.!!"),$("#message").css("color","red")):($("#message").html("Password Match!!"),$("#message").css("color","green"))}))}));