function getTheme () {
  $.get('/api:1/theme')
    .done(rep => {
      $('.footer .company').attr('href', rep.company_url || '/').text(rep.company_name)
      $('.footer .address').text(rep.company_address)
      $('.footer .contact').text(rep.company_contact)
      $('.footer .terms').css('color', rep.primary_color)
      $('.login-button .signin-button').css({'background': rep.primary_color, 'border-color': rep.primary_color})
      $('.title').css('color', rep.primary_color)
      $('#pre-login').show()
      $('#init').hide()
    })
}
function reloadSession () {
  $.get('/api:1/session')
    .done(function () {
      let state = Cookies.get('state')
      if (state !== 'undefined') {
        window.location = '/authorize_approved?session=1'
      }
    })
    .fail(function () {
      $('#pre-login').show()
      $('#init').hide()
    })
}

function login (e) {
  if (e) e.preventDefault()
  var values = {}
  $('#loginform :input').each(function () {
    values[this.name] = $(this).val()
  })
  $.ajax({
    type: 'POST',
    url: '/api:1/session',
    contentType: 'application/json',
    data: JSON.stringify(values),
    cache: false,
    processData: false
  })
    .done(function (data) {
      console.log(data)
    })
    .fail(function () {
      $('#loginerror').show()
    })
    .always(reloadSession)
}

function progressHandlingFunction (e) {
  if (e.lengthComputable) {
    $('progress').attr({ value: e.loaded, max: e.total })
  }
}

$(document).ready(function () {
  reloadSession()
  getTheme()
  $('#loginform').submit(login)
})
