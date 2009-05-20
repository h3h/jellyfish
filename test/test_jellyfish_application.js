(function($) {
  with(jqUnit) {

    context('Jellyfish', 'bare initializer', {
      before: function () {
        this.app = Jellyfish(function () {

          bloom('/', function () {
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

  }
})(jQuery);
