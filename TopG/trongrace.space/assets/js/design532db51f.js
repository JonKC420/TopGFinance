$('.currency-top a').on('click', function (e) {
    var indis = $(this).index();
    $('.currency-top a').removeClass('active');
    $(this).addClass('active');
    $('.currency-translation .tab-content').hide().eq(indis).fadeIn();
    e.preventDefault();
});


var swiper = new Swiper('.swiper-news', {
    navigation: {
        nextEl: '.sw-next',
        prevEl: '.sw-prev',
    },
    autoplay: true,
});



$("#hamburger_btn").on("click", function (e) {
    $(this).toggleClass('change');
    $("body").toggleClass("actives");
    e.preventDefault()
});

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    alert('Link Copied');

}
$('.not-click').on('click',function (e) {
e.preventDefault();
});

$(document).on('click', '.scroll', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

$('.closes').on('click', function (e) {
    $('#mobileMenu').fadeToggle();
    e.preventDefault();
});

$('#hamburger_btn').on('click', function (e) {
    $('#mobileMenu').fadeToggle();
    e.preventDefault();
});

$(window).on('resize', function(){
    var win = $(this);
    if (win.width() >= 580) {
        $('.select-country').on('change', function(){
           var e = $(this).find(":selected").data('text');
           $('.author-list .author-box').not(this).hide();   
           $('.author-list').find('.' + e).show();
        });
        
        $('.author-list .indian').show();        
    }
});

$('.select-country').on('change', function(){
   var e = $(this).find(":selected").data('text');
   $('.author-list .author-box').not(this).hide();   
   $('.author-list').find('.' + e).show();
});

$('.author-list .indian').show();