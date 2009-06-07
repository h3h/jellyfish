(function($) {
  var context = jqUnit.context;
  var equals = jqUnit.equals;
  context('Jellyfish', 'bare initializer', {
    before: function () {

      this.app = Jellyfish(function () {
        this.
        bloom('/', function (params) {
          this.
          sting("#header/click", function () {
            alert("hi");
          });
        });
      });

    }
  }).
  should('have one bloom', function () {
    equals(this.app.blooms.length, 1);
  });
})(jQuery);
