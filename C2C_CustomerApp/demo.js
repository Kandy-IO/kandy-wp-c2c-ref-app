const c2cHostURL = window.location.pathname + 'C2C_CustomerAppSDK/'
//let lab = 'uae'

function toURLQuery(json) {
  return Object.keys(json)
    .map(k => String(encodeURIComponent(k) + '=' + encodeURIComponent(json[k])))
    .join('&')
}

function openC2C(identifier, lab, langCode) {
  let payload = {
    i: identifier,
    lb: lab,
    l: langCode
  }
  window.open(c2cHostURL + '?' + toURLQuery(payload), '_blank', 'width=480,height=640')
}

$(e => {
  $('.menu-box').hide()
  $('.hero .tab-item a').on('click', e => {
    $('.hero .tab-item a').removeClass('active')
    $('.menu-box').hide()
    $(e.target).addClass('active')
    $('#' + $(e.target).data('link')).show()
  })
  $('.menu-tab-content').hide()
  $('#box_bookflight').show()
  $('.menu-box .menu-item a').on('click', e => {
    $('.menu-box').hide()
    $('.menu-tab-content').hide()
    $('#' + $(e.target).data('link')).show()
  })

  $("#btn_contactus_1").click(function () {
    
    openC2C('non-tokenized-with-landingpage', document.getElementById("selectLab").value, 'en-US')
  });
})
