/**
  Jellyfish
  2009-05-19 / Brad Fults <bfults@gmail.com>
**/

Jellyfish = function (blkApp) {

  /*
   class Bloom
     RegExp matcher
     Array[Sting] stings

   class Sting
     String selector
     String event
     Function callback

  */

  function Bloom (matcher) {
    this.matcher = matcher;
    this.stings = [];
    this.matches = function (location) {
      return true;
    };
  }

  function Sting (spec, fn) {
    var sel_evt = spec.split('/');
    this.selector = sel_evt.shift();
    this.event = sel_evt.shift();
    this.callback = fn;
  }

  this.blooms = [];
  var app = this;

  var bloom = function (matcher, blkBloom) {
    var b = new Bloom(matcher);
    if (b.matches(location)) {
      var sting = function (spec, fn) {
        b.stings.push( new Sting(spec, fn) );
      };

      blkBloom(b.params, sting);

      app.blooms.push(b);
    }
  };

  blkApp(bloom);

  return this;
};
