
$(document).jellyfish(function () {

  bloom('/about', function () {

    sting('#footer/click', function (evt) {
      alert("Hi there.");
    });

    sting("ul/mouseover", function (evt) {
      $(this).css('backgroundColor', '#00f');
    });

  });

  bloom(/events\/(.*)/, function (params) {

    sting('#header/click', function (evt) {
      alert("Event id:" + params[0]);
    });

  });

  bloom('/users/:username', function (params) {

    sting('#header/click', function (evt) {
      $(this).html("Hi, " + params['username']);
    });

  });

});
