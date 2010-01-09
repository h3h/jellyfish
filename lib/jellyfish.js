/**
  Jellyfish
  2009-05-19 / Brad Fults <bfults@gmail.com>
**/

Jellyfish = function(blkApp) {

  var app = this;
  this.blooms = [];

  var RX_URL_STRING_FORMAT = /\/:(\w+)/;
  var RX_URL_STRING_FORMAT_TOKEN = /\\:(\w+)/g;

  function escapeForRegex(str) {
    return str.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
  }

  function replaceTokensWithRegexen(str) {
    return str.replace(RX_URL_STRING_FORMAT_TOKEN, "([^/]+)");
  }

  /*
   class Bloom
     RegExp matcher
     Hash params
     Array[Sting] stings

   class Sting
     String selector
     String event
     Function callback

  */
  function Bloom(matcher) {
    this.matcher = matcher;
    this.params = {};
    this.stings = [];

    this.matchesLocation = function() {
      var locMatch = this.matcher;
      var locActual = Jellyfish.getPathName();
      if (locMatch.constructor == String) {
        return this.matchesLocationString(locActual);
      }
      else if (locMatch.constructor == RegExp) {
        var m = locMatch.exec(locActual);
        if (m) {
          if (m.length > 1) {
            this.params = m.slice(1);
          }
          return true;
        }
      }
      return false;
    };

    this.matchesLocationString = function (locActual) {
      var locMatch = this.matcher;
      var m;
      if (m = RX_URL_STRING_FORMAT.test(locMatch)) {
        var keys = [];
        var segments = locMatch.split('/');
        for (var i=0; i < segments.length; i++) {
          if (segments[i].charAt(0) == ':') {
            keys.push(segments[i].slice(1));
          }
        }
        var values = [];
        var rx = new RegExp(
          '^' + replaceTokensWithRegexen(escapeForRegex(locMatch)) + '$'
        );
        if (m = rx.exec(locActual)) {
          values = m.slice(1);
          for (var i=0; i < values.length; i++) {
            this.params[keys[i]] = values[i];
          }
          return true;
        }
      }
      else {
        return (locMatch == locActual);
      }
      return false;
    };
  }

  function Sting(spec, fn) {
    var sel_evt = spec.split('/');
    this.selector = sel_evt.shift();
    this.event = sel_evt.shift();
    this.callback = fn;
    // TODO: attach the event handler
  }

  function bloom(matcher, blkBloom) {
    var b = new Bloom(matcher);
    if (b.matchesLocation()) {
      function sting(spec, fn) {
        b.stings.push(new Sting(spec, fn));
        return contextBloom;
      };

      var contextBloom = {sting: sting};
      blkBloom.call(contextBloom, b.params);
      app.blooms.push(b);
    }
    return contextApp;
  };

  var contextApp = {bloom: bloom};
  blkApp.call(contextApp);
  return this;
};

Jellyfish.getPathName = function () {
  return window.location.pathname;
}
