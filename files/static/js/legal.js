function getTheme () {
  $.get('/api:1/theme')
    .done(rep => {
      $('.footer .company').attr('href', rep.company_url || '/').text(rep.company_name)
      $('.footer .address').text(rep.company_address)
      $('.footer .contact').text(rep.company_contact)
      $('.footer .terms').css('color', rep.primary_color)
      $('#title').css('color', rep.primary_color)
      $('#web_title').text(getWebTitle(rep.product_name))
    })
}

function getLegal () {
  $.get('/api:1/term_of_service')
    .done((rep) => {
      $('span#last_update').text(setLastUpdated(rep.last_update))
      $('.logo #title').text(rep.title)
      $('#content').text(rep.body)
    })
}

function getWebTitle (productName) {
  if (productName && productName.trim() !== '') {
    return `${productName} - Legal`
  }

  return 'Legal'
}

function setLastUpdated (ts) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const date = new Date(ts)
  const mm = monthNames[date.getMonth()]
  const dd = date.getDate()
  const yyyy = date.getFullYear()

  return `${mm}, ${dd}, ${yyyy}`
}

$(document).ready(function () {
  getTheme()
  getLegal()
})
