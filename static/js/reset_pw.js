function resetPassword(e) {
  var pw_new1 = $("#pw_new1").val();
  var pw_new2 = $("#pw_new2").val();
  $(".reset_error").hide();
  var pwV = /^((?!.*\s)(?=[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).{8,20})$/;
  if (!pwV.test(pw_new1)) {
      $("#reset_error1").show();
      return false;
  }
  if (pw_new1 !== pw_new2) {
      $("#reset_error2").show();
      return false;
  }
  var datas = {
      reset_token: resetToken,
      new_password: pw_new1
  };
  $.ajax({
      type: 'PUT',
      url: '/api:1/reset',
      contentType: 'application/json',
      data: JSON.stringify(datas),
      cache: false,
      processData: false
  }).done(function(data) {
      if (data.status =="ok") {
          window.location = "/api:1/reset/done";
      }
  }).fail(function( jqXHR, textStatus ) {
      if (jqXHR.status == 400) {
          window.location = "/api:1/reset_token/expired";
      }
  });
}
$(document).ready(function(){
    $("#reset_button").click(resetPassword);
    $("#reset_form").submit(resetPassword);
});
