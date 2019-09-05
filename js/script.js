$(document).ready(function () {
  // menu
  $('#burger a').click(function () {
    $('#leftdrop').slideDown();
    $('#leftdrop').css({
      'display': 'flex'
    });
  });
  $('#close, .menu-item').click(function () {
    $('#leftdrop').slideUp();
  });


  //Chrome Smooth Scroll
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {

  };
  // Запрет на вытягивание картинок
  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });
  // Фильтры  
  var config = {
    animation: {
      effects: 'fade stagger(100ms)',
      duration: 300,
      staggerSequence: function (i) {
        return (2 * i) - (5 * ((i / 3) - ((1 / 3) * (i % 3))));
      }
    }
  };
  var mixer1 = mixitup('.awards_wrap', config);
  var mixer2 = mixitup('.files_wrap', config);

  // Спрятать длинный текст
  $('.filename').truncate({
    length: 120,
    minTrail: 20,
    moreText: 'Показать всё',
    lessText: 'Скрыть',
    ellipsisText: " ..."
  });
  // Свайпы
  var mediaQuery = window.matchMedia("screen and (max-width: 920px)");
  mediaQuery.addListener(foo);
  foo(mediaQuery);

  function foo(mq) {
    if (mq.matches) {
      $("section").swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
          if (direction == 'right') {
            countUp();
          }
          if (direction == 'left') {
            countDown();
          }
        },
      });
    }
    return false;
  }
 

  // AJAX
  $('#form_btn').on("click", function () {
    var name = $('#name').val().trim(),
      phone = $('#phone').val().trim(),
      email = $('#e_mail').val().trim(),
      message = $('#message').val().trim();

    $.ajax({
      url: '../mail.php',
      type: 'POST',
      cache: false,
      data: { 'name': name, 'email': email, 'phone': phone, 'message': message },
      dataType: 'html',
      beforeSend: function () {
        $('#form_btn').prop("disabled", true);
      },
      succes: function () {
        $('#form_btn').prop("disabled", false);
        $('#form_btn').text('Отправлено');
      }
    });
  });

});

// Переходы
var count = 1;
var menuItems = [{
  label: 'Главная',
  value: 'first'
}, {
  label: 'Обо мне',
  value: 'about'
}, {
  label: 'Дисциплины',
  value: 'subjects'
}, {
  label: 'Награды',
  value: 'awards'
}, {
  label: 'Файлы',
  value: 'files'
}, {
  label: 'Галерея',
  value: 'gallery'
}, {
  label: 'Контакты',
  value: 'contacts'
}];

function setMenu() {
  let menu = document.getElementById('leftdrop');
  for (let i = 0; i < menuItems.length; i++) {
    let menuItem = createMenuItem(menuItems[i].label, menuItems[i].value, i);
    menu.appendChild(menuItem);
  }
}

function createMenuItem(item, value, index) {
  let div = document.createElement('div');
  div.classList.add('menu-item');
  div.innerHTML = item;
  div.addEventListener("click", selectItem, false)
  div.index = index;
  div.value = value;
  
  return div;
}

function setMenuItem(value) {
  let tabItem = document.getElementsByTagName('section');

  if (typeof value === 'string') {
    for (let i = 0; i < tabItem.length; i++) {
      tabItem[i].classList.add('hidden');
      tabItem[i].style.animation = "fade_in .5s ease";
      if (tabItem[i].id === value) {
        tabItem[i].classList.remove('hidden');
      }
    }
  }

  if (typeof value === 'number') {
    for (let i = 0; i < tabItem.length; i++) {
      tabItem[i].classList.add('hidden');
      tabItem[i].style.animation = "fade_in .5s ease";
      if (i === value) {
        tabItem[i].classList.remove('hidden');
        
      }
    }
  }
}

function checkCounter(n) {
  if (n == 1) {
    document.getElementsByClassName('counter_up')[0].classList.add('hidden');
  } else {
    document.getElementsByClassName('counter_up')[0].classList.remove('hidden');
  }
  if (n == 7) {
    document.getElementsByClassName('counter_down')[0].classList.add('hidden');
  } else {
    document.getElementsByClassName('counter_down')[0].classList.remove('hidden');
  }
}

function setCount() {
  let result = document.getElementById('count');
  result.innerHTML = '0' + count;
  checkCounter(count);
}

function countDown() {
  if (count < menuItems.length) {
    count++;
    setCount();
    setMenuItem(count - 1);
  }
}

function countUp() {
  if (count > 1) {
    count--;
    setCount();
    setMenuItem(count - 1);
  }
}

function selectItem() {
  count = event.target.index + 1;
  setCount();
  setMenuItem(event.target.value);
}

(function initialization() {

  setMenu();
  setCount();
  setMenuItem(count - 1);
  
})();