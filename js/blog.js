$(document).ready(function () {
  // меню
  const menu = $('#leftdrop');

  $('#burger a').click(function () {
    $('.overlay').show();
    menu.css({
      'display': 'block',
      'width': '300px',
    });
  });

  function closeMenu() {
    $('.overlay').hide();
    menu.css({ 'width': '0' },
      setTimeout(() => {
        menu.css({ 'display': 'none' });
      }, 400));
    return false;
  }

  $('#leftdrop a, .overlay').click(function () {
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