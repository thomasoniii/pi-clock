import Ember from 'ember';
import Rectangle from './Rectangle';
import Size from "./Size";

export default Ember.Object.extend({

  x : -1,
  y : -1,

  formatAsString(x,y) {
    return '{' + x + ', ' + y + '}';
  },

  string : Ember.computed('x', 'y', {
    get : function(key) {
      return this.formatAsString(this.get('x'), this.get('y'));
    },
    set : function(key, val) {
      var m;
      if (m = val.match(/\s*{\s*(\d+)\s*,\s*(\d+)\s*}\s*/)) {
        this.set('x', parseFloat(m[1]));
        this.set('y', parseFloat(m[2]));
        return this.formatAsString(m[1], m[2]);
      }
      else {
        throw new Error("Invalid string for Point");
      }
    }
  }),

  offset : function(dx, dy) {
    return this.constructor.create(
      {
        x : this.x + dx,
        y : this.y + dy
      }
    )
  },

  rectWithPoint : function(point) {
    var ux = this.x < point.x
      ? this.x
      : point.x;
    var uy = this.y < point.y
      ? this.y
      : point.y;

    var width = Math.abs(this.x - point.x);
    var height = Math.abs(this.y - point.y);

    return Rectangle.create({
      origin: this.constructor.create({x : ux, y : uy}),
      size  : Size.create ({width : width, height : height})
    });
  },

  equals(p2) {
    if (p2 === undefined) {
      return false;
    }
    return this.get('x') == p2.get('x') && this.get('y') == p2.get('y');
  },

});
