$(document).ready(function() {
  $('.content').children().hide();
  $('.content').children('.first').show();
  $('.nav-button-list ul li').click(function () {
    $('.nav-button-list ul li').removeClass('current');
    var myClass = $(this).attr("class");
    $('.content').children().hide();
    $('.content').children('.' + myClass).show();
    $(this).addClass('current');
    console.log($(this), 'clicked!!!')
  });
});

