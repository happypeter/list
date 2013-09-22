$(document).ready(function() {
  $('ul li').click(function () {
    $('ul li').removeClass('current');
    $(this).addClass('current');
    console.log($(this), 'clicked!!!')
  });
});

