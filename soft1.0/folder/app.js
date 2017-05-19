"use strict";

$(function () {
  (function () {
    var main__hr = $(".main__hr");
    var width = main__hr.width();
    var time;
    var hr__page = $(".hr__itemBox").children().length;
    var this__hrPage = 1;

    $(".hr__itemBox").children().each(function (i) {
      $(this).css({
        'left': i * width,
        'width': width
      });
    });

    function setTime() {
      time = setInterval(function () {
        this__hrPage++;
        this__hrPage >= hr__page && (this__hrPage = 0);
        $(".hr__itemBox").animate({
          left: this__hrPage * width * -1
        }, 500);
      }, 4000);
    }
    setTime();

    $(".hr__itemBox").mouseover(function () {
      clearInterval(time);
    });
    $(".hr__itemBox").mouseout(function () {
      setTime();
    });
    $(".hr__left").click(function () {
      this__hrPage--;
      this__hrPage < 0 && (this__hrPage = hr__page - 1);
      $(".hr__itemBox").animate({
        left: this__hrPage * width * -1
      }, 500);
    });
    $(".hr__right").click(function () {
      this__hrPage++;
      this__hrPage >= hr__page && (this__hrPage = 0);
      $(".hr__itemBox").animate({
        left: this__hrPage * width * -1
      }, 500);
    });
  });

  /*()*/var this__page = 0;
  $("#main").onepage_scroll({
    sectionContainer: ".main__box",
    easing: "ease",
    animationTime: 500,
    pagination: false,
    updateURL: false,
    beforeMove: function beforeMove(index) {
      $(".header__item").removeClass('header__item--active');
      $(".header__item").eq(index - 1).addClass('header__item--active');
      $(".main__box").removeClass('main__anim');
      $(".main__box").eq(index - 1).addClass('main__anim');
    },
    afterMove: function afterMove(index) {},
    loop: false,
    keyboard: true,
    responsiveFallback: false,
    direction: "vertical"
  });

  $(".header__menubox").on("click", ".header__item", function () {
    var index = $(this).index();
    $('.header__menubox').removeClass('header__menubox--mobile');
    $("#main").moveTo(index);
  });

  (function () {
    $(".top").click(function () {
      $("#main").moveTo(1);
      $('.header__menubox').removeClass('header__menubox--mobile');
    });
    $('.header__icon i').click(function () {
      $('.header__menubox').toggleClass('header__menubox--mobile');
    });
  })();


  (function () {
    var state = 1;
    var width = $(".solve").width();
    var time = setInterval(change, 5000);
    $(".solve__leftBtn,.solve__rightBtn").click(change);
    function change() {
      state *= -1;
      var left = state > 0 ? 0 : width * -1;
      $(".solve__itemBox").animate({
        left: left
      }, 500);
    }
  })();
});