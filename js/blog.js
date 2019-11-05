$(document).ready(function () {
  // для поправок адаптивности
  const mq920 = window.matchMedia("screen and (max-width: 920px)"),
    mq576 = window.matchMedia("screen and (max-width: 576px)"),
    mq480 = window.matchMedia("screen and (max-width: 480px)");
  // поиск
  const search = $('input[name="search"]');

  search.focus(function () {
    let value = '300px';
    if (mq920.matches) {
      value = '200px';
    }
    if (mq480.matches) {
      value = '50vw';
      $('.logo img').css({
        'margin-right': '0'
      })
    }
    $(this).css({
      'padding': '0 18px 0 0px',
      'width': value,
      'border-bottom': '1px solid #fefbfb'
    });
    if (mq576.matches) {
      $('.logo p').hide(100);
    }

  });

  function searchBlur() {
    search.blur().css({
      'width': '0',
      'border-bottom': 'none'
    }, function () {
      search.css({ 'padding': '0' })
    });

    $('.svg-search').show(200);
    $('.svg-clear').hide(200);

    if ($('.logo p').is(':hidden')) {
      $('.logo p').show(400);
      $('.logo img').css({ 'margin-right': '20px' })
    }
  }

  $('.svg-clear').click(function () {
    searchBlur();
  });

  $('.svg-search').click(function () {
    search.focus();
    $(this).css({ 'z-index': '3' });
    $('.search').css({ 'padding-left': '20px' });
    setTimeout(() => {
      $(this).hide(200);
      $('.svg-clear').show(200);
    }, 100);
  });

  $(window).scroll(function (e) {
    if ($(this).scrollTop() > 150) {
      e.stopPropagation();
      searchBlur();
    }
  });

  $(document).keydown(function (e) { // нажатие на esc
    if (e.keyCode === 27) {
      e.stopPropagation();
      searchBlur();
    }
  });

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
    let value = '300px';
    if (mq480.matches) {
      value = '250px';
    }
    $('.overlay').show();
    menu.css({
      'display': 'block',
      'width': value
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
  //Chrome Smooth Scroll
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {

  };
  // наверх
  $(function () {
    $(".back-top").hide();

    if(!mq576.matches) { // для мобилок отключить
      $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
          $(".back-top").fadeIn();
        } else {
          $(".back-top").fadeOut();
        }
      });
    }
      
    $(".back-top").click(function () {
      $("body,html").animate({
        scrollTop: 0
      }, 800);
      return false;
    });
    
  });

  // fancybox
  $('.post img').each(function () {
    $(this).wrap("<a href=" + $(this).attr('src') + "></a>");
    let wrap = $(this).parent();
    wrap.addClass('fancy')
  });
  $('.fancy').fancybox();
});