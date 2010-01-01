// jQuery version

$(document).jellyfish(function () {

  this.bloom('/about', function () {
    this.sting('#footer/click', function (evt) {
      alert("Hi there.");
    });
    this.sting("ul/mouseover", function (evt) {
      $(this).css('backgroundColor', '#00f');
    });
  });

  this.bloom(/events\/(.*)/, function (params) {
    this.sting('#header/click', function (evt) {
      alert("Event id:" + params[0]);
    });
  });

  this.bloom('/users/:username', function (params) {
    this.sting('#header/click', function (evt) {
      $(this).html("Hi, " + params['username']);
    });
  });

});

// standalone version

Jellyfish(function () {

  this.bloom('/', function () {
    this.sting("#header/click", function () {
      alert("hi");
    });
  });

});
