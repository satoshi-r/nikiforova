$(document).ready(function () {
  // меню
  const menu = $('#leftdrop');

  function closeMenu() {
    menu.find('#close').fadeOut(100);
    $('.overlay').hide();
    menu.css({ 'width': '0' },
      setTimeout(() => {
        menu.css({ 'display': 'none' });
      }, 400));
    return false;
  }

  menu.find('.menu_category').click(function (e) {
    menu.find('.menu_container').toggleClass('category_open');
  });

  $('#burger a').click(function () {
    $('.overlay').show();
    menu.css({
      'display': 'block',
      'width': '300px'
    }, setTimeout(() => {
      menu.find('#close').fadeIn();
    }, 400));
  });
  
  $('#leftdrop a:not(.menu_category), .overlay').click(function () {
    closeMenu();
  });

  $(document).keydown(function (e) {// нажатие на esc
    if (e.keyCode === 27) {
      e.stopPropagation();
      closeMenu();
    }
  });
  // наверх
  $(function () {
    $(".back-top").hide();

    $(window).scroll(function () {
      if ($(this).scrollTop() > 600) {
        $(".back-top").fadeIn();
      } else {
        $(".back-top").fadeOut();
      }
    });

    $(".back-top").click(function () {
      $("body,html").animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });
});