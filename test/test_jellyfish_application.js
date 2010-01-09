var MY_CLICKED_EVENT = 0;
var MY_EXACT_EXECUTED_BLOOM = 0;
var MY_OTHER_EXECUTED_BLOOM = 0;
var MY_REGEX_BLOOM = 0;
var MY_REGEX_PARAM_0;
var MY_REGEX_PARAM_1;
var MY_STRING_FORMAT_BLOOM = 0;
var MY_STRING_FORMAT_PARAM_0;
var MY_STRING_FORMAT_PARAM_1;
var MY_WRONG_STRING_FORMAT_BLOOM = 0;

// stub out the getPathName method so we can test a particular URL
Jellyfish.getPathName = function () {
  return "/foo/bar/13";
}

var JellyfishApp = Jellyfish(function () {
  this.bloom('/other_page', function (params) {
    MY_OTHER_EXECUTED_BLOOM = 1;
  });

  this.bloom(/^\/foo/, function (params) {
    MY_REGEX_BLOOM = 1;
    this.sting("#test_link/click", function () {
      MY_CLICKED_EVENT = 1;
    });
  });

  this.bloom(/\/foo\/([^\/]+)\/([^\/]+)/, function (params) {
    MY_REGEX_PARAM_0 = params[0];
    MY_REGEX_PARAM_1 = params[1];
  });

  this.bloom('/foo/bar/13', function (params) {
    MY_EXACT_EXECUTED_BLOOM = 1;
  });

  this.bloom('/:base/bar/:id', function (params) {
    MY_STRING_FORMAT_BLOOM = 1;
    MY_STRING_FORMAT_PARAM_0 = params['base'];
    MY_STRING_FORMAT_PARAM_1 = params['id'];
  });

  this.bloom('/foo/bar/13/:id', function (params) {
    MY_WRONG_STRING_FORMAT_BLOOM = 1;
  });
});

var context = jqUnit.context;
var equals = jqUnit.equals;
context('Jellyfish', 'bare initializer', {
  before: function () {}
}).
should('execute a bloom with an exact matching string', function () {
  equals(MY_EXACT_EXECUTED_BLOOM, 1);
}).
should('not execute a bloom with a non-matching string', function () {
  equals(MY_OTHER_EXECUTED_BLOOM, 0);
}).
should('execute the correct bloom for a regex matcher', function () {
  equals(MY_REGEX_BLOOM, 1);
}).
should('give correct params for regex group matches', function () {
  equals(MY_REGEX_PARAM_0, 'bar');
  equals(MY_REGEX_PARAM_1, '13');
}).
should('execute the correct bloom for a matching string format', function () {
  equals(MY_STRING_FORMAT_BLOOM, 1);
}).
should('give correct params for a matching string format', function () {
  equals(MY_STRING_FORMAT_PARAM_0, 'foo');
  equals(MY_STRING_FORMAT_PARAM_1, '13');
}).
should('not execute a bloom with a non-matching string format', function () {
  equals(MY_WRONG_STRING_FORMAT_BLOOM, 0);
}).
should_eventually('install a click handler on an id', function () {
  // click on #header
  //document.getElementById("test_link").click();
  equals(MY_CLICKED_EVENT, 1);
});
