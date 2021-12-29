const c2cHostURL = 'http://localhost:8080/' //window.location.pathname + '/C2C_CustomerAppSDK/'
let lab = 'uae'

function toURLQuery(json) {
  return Object.keys(json)
    .map(k => String(encodeURIComponent(k) + '=' + encodeURIComponent(json[k])))
    .join('&')
}
function getLabName() {
 lab = prompt("Please enter lab", "uae");
  console.log(lab)
}

function openC2C(identifier,lab, langCode) {
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
  // Bridges
  // $('#btn_contactus_1').on('click', e => openC2C('non-tokenized-with-landingpage',lab, 'en-US'))
  // $('#btn_contactus_2').on('click', e => openC2C('non-tokenized-with-landingpage', lab, 'en-US')) // with baggage no.
  // $('#btn_contactus_3').on('click', e => openC2C('non-tokenized-with-landingpage', lab, 'en-US'))

  $("#btn_contactus_1").click(function(){
     getLabName()
     openC2C('non-tokenized-with-landingpage', lab, 'en-US')
    });
   $("#btn_contactus_2").click(function(){
     getLabName()
     openC2C('non-tokenized-with-landingpage', lab, 'en-US')
    });
   $("#btn_contactus_3").click(function(){
     getLabName()
     openC2C('non-tokenized-with-landingpage', lab, 'en-US')
    });
})
