import Ember from 'ember';

export default Ember.Object.extend({

  alpha : 1,

  hRGB : Ember.computed('RGB', {
    get() {
      return '#' + this.get('RGB');
    },
    set(key, val) {
      var m;
      if (m = val.match(/#(......)/)) {
        return this.set('RGB', m[1]);
      }
    }
  }),

  RGB : Ember.computed('R','G','B', {
    get(key) {

      var colors = ['R', 'G', 'B'];
      var ret = '';

      for (var c of colors) {
        var col = this.get(c);
        if (col.length == 1) {
          col = '0' + col;
        }
        ret += col;
      }

      return ret;
    },

    set(key, val) {
      var m;
      if (m = val.match(/(..)(..)(..)/)) {
        this.set('R', m[1]);
        this.set('G', m[2]);
        this.set('B', m[3]);
        return val;
      }
    }
  }),

  R : Ember.computed('r', {
    get(key) {
      return this.get('r').toString(16);
    },
    set(key,val) {
      this.set('r', parseInt(val, 16));
      return val;
    }
  }),

  G : Ember.computed('g', {
    get(key) {
      return this.get('g').toString(16);
    },
    set(key,val) {
      this.set('g', parseInt(val, 16));
      return val;
    }
  }),

  B : Ember.computed('b', {
    get(key) {
      return this.get('b').toString(16);
    },
    set(key,val) {
      this.set('b', parseInt(val, 16));
      return val;
    }
  }),

  rgb : Ember.computed('r', 'g', 'b', function() {
    return "rgb(" + this.get('r') + "," + this.get('g') + "," + this.get('b') + ")";
  }),

  rgba : Ember.computed('r', 'g', 'b', 'alpha', function() {
    return "rgba(" + this.get('r') + "," + this.get('g') + "," + this.get('b') + ',' + this.get('alpha') + ")";
  }),

  invert () {
      return this.constructor.create( { r : 255 - this.get('r'), g : 255 - this.g, b : 255 - this.get('b') } );
  },

  darkenBy (amount) {
    return this.subtract(
      this.constructor.create(
        {
          r : amount,
          g : amount,
          b : amount
        }
      )
    );
  },

  lightenBy (amount) {
    return this.add(
      this.constructor.create(
        {
          r : amount,
          g : amount,
          b : amount
        }
      )
    );
  },

  subtract (c) {
  	return this.constructor.create(
      {
        r : Math.max(this.get('r') - c.get('r'), 0),
	      g : Math.max(this.get('g') - c.get('g'), 0),
        b : Math.max(this.get('b') - c.get('b'), 0)
      }
  	);
  },

  add (c) {

  	return this.constructor.create(
      {
        r : Math.min(this.get('r') + c.get('r'), 255),
	      g : Math.min(this.get('g') + c.get('g'), 255),
        b : Math.min(this.get('b') + c.get('b'), 255)
      }
  	);
  },

  rgbFromString (string) {
      if ($) {
          var $div = $.jqElem('div').css('background-color', string);
          var rgb = $div.css('background-color');
          var m;
          if (m = rgb.match(/rgb\((\d+), (\d+), (\d+)\)/)) {
              return {
                  r : +m[1],
                  g : +m[2],
                  b : +m[3]
              };
          }
      }
      else {
          return undefined;
      }
  },

});
