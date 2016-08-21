import Ember from 'ember';
import Size from "./Size";
import Point from "./Point";

export default Ember.Object.extend({

  init() {

    this._super(...arguments);

    if (this.get('origin') === undefined) {
      this.set('origin', Point.create());
    }

    if (this.get('size') === undefined) {
      this.set('size', Size.create());
    }

  },

  formatAsString(origin, size) {
    return '{' + origin.get('string') + ', ' + size.get('string') + '}';
  },

  area : Ember.computed('size.width', 'size.height', function() {
    return this.get('size.width') * this.get('size.height');
  }),

  valid : Ember.computed('origin.x', 'origin.y', 'size.width', 'size.height', function() {
    if (
         isNaN(this.get('origin.x'))
      || isNaN(this.get('origin.y'))
      || isNaN(this.get('size.width'))
      || isNaN(this.get('size.height'))) {
        return false;
      }
      else {
        return true;
      }
  }),

  string : Ember.computed('origin.x', 'origin.y', 'size.width', 'size.height', {
    get : function(key) {
      return this.formatAsString(this.get('origin'), this.get('size'));
    },
    set : function(key, val) {
      var m;
      if (m = val.match(/\s*{\s*({\s*\d+\s*,\s*\d+\s*})\s*,\s*({\s*\d+\s*,\s*\d+\s*})\s*}\s*/)) {
        this.set('origin', Point.create({string : m[1]}));
        this.set('size',    Size.create({string : m[2]}));

        return this.formatAsString(this.get('origin'), this.get('size'));
      }
      else {
        throw new Error("Invalid string for Rect");
      }
    }
  }),

  center : Ember.computed('origin.x', 'origin.y', 'size.width', 'size.height', {
    get : function(key) {
      console.log("GETS IT");
      var p = Point.create(
        {
          x : this.get('origin.x') + this.get('size.width') / 2,
          y : this.get('origin.y') + this.get('size.height') / 2,
        }
      )
      console.log("P B ", p, p.get('string'))
      return p
    },
    set : function(key, val) {
      this.set('origin', this.centerAtPoint(val))
      return val;
    }
  }),

  centerAtPoint : function(point) {
    return Point.create(
      {
        x : point.get('x') - this.get('size.width') / 2,
        y : point.get('y') - this.get('size.height') / 2,
      }
    )
  },

  invert() {
    return this.constructor.create(
      {
        origin : this.origin,
        size : Size.create(
          {
            width  : this.get('size.height'),
            height : this.get('size.width')
          }
        )
      }
    )
  },

  lowerRight() {
    return Point.create(
      {
        x : this.get('origin.x') + this.get('size.width'),
        y : this.get('origin.y') + this.get('size.height')
      }
    )
  },

  inset(dx, dy) {
    return this.constructor.create(
      {
        origin : Point.create(
          {
            x : this.get('origin.x') + dx / 2,
            y : this.get('origin.y') + dy / 2
          }
        ),
        size : Size.create(
          {
            width  : this.get('size.width')  - dx,
            height : this.get('size.height') - dy
          }
        )
      }
    )
  },

  intersects(r2) {
    if (
         this.get('origin.x') < r2.get('origin.x')      + r2.get('size.width')
      && this.get('origin.x') + this.get('size.width')  > r2.get('origin.x')
      && this.get('origin.y') < r2.get('origin.y')      + r2.get('size.height')
      && this.get('origin.y') + this.get('size.height') > r2.get('origin.y')
      )
      {
        return true;
    }
    else {
      return false;
    }
  },

  adjacent(r2, threshold) {

    if (threshold == undefined) {
      threshold = 1;
    }

    var [x1, x2] = this.get('origin.x') < r2.get('origin.x')
      ? [this, r2]
      : [r2, this];
    var [y1, y2] = this.get('origin.y') < r2.get('origin.y')
      ? [this, r2]
      : [r2, this];

    var xd = x1.get('origin.x') + x1.get('size.width') - x2.get('origin.x');

    if (Math.abs(xd) <= threshold && y1.get('origin.y') + y1.get('size.height') > y2.get('origin.y')) {
      return true;
    }

    var yd = y1.get('origin.y') + y1.get('size.height') - y2.get('origin.y');

    if (Math.abs(yd) <= threshold && x1.get('origin.x') + x1.get('size.width') > x2.get('origin.x')) {
       return true;
    }

    return false;
  },

  unionRect(r2, padding) {

    if (padding === undefined) {
      padding = 0;
    }

    var myLL = this.lowerRight();
    var r2LL = r2.lowerRight();

    var rightX = Math.max(myLL.x, r2LL.x);
    var rightY = Math.max(myLL.y, r2LL.y);

    var unionOrigin = Point.create(
      {
        x : Math.min(this.get('origin.x'), r2.get('origin.x')) - padding,
        y : Math.min(this.get('origin.y'), r2.get('origin.y')) - padding
      }
    );

    return this.constructor.create(
      {
        origin : unionOrigin,
        size : Size.create(
          {
            width  : rightX - unionOrigin.get('x') + padding * 2,
            height : rightY - unionOrigin.get('y') + padding * 2
          }
        )
      }
    );

  },

  intersectRect(r2) {

    var myLL = this.lowerRight();
    var r2LL = r2.lowerRight();

    var rightX = Math.min(myLL.x, r2LL.x);
    var rightY = Math.min(myLL.y, r2LL.y);

    var intersectOrigin = Point.create(
      {
        x : Math.max(this.get('origin.x'), r2.get('origin.x')),
        y : Math.max(this.get('origin.y'), r2.get('origin.y'))
      }
    );

    var intersectSize = Size.create(
      {
        width  : rightX - intersectOrigin.get('x'),
        height : rightY - intersectOrigin.get('y')
      }
    );

    if (intersectSize.get('width') < 0 || intersectSize.get('height') < 0) {
      return this.constructor.create();
    }
    else {
      return this.constructor.create(
        {
          origin : intersectOrigin,
          size   : intersectSize,
        }
      );
    }

  },

  containsPoint(p) {
    if (
           this.get('origin.x') < p.get('x')
        && this.get('origin.x') + this.get('size.width') > p.get('x')
        && this.get('origin.y') < p.get('y')
        && this.get('origin.y') + this.get('size.height') > p.get('y') ) {
          return true;
    }
    else {
      return false;
    }
  },

  equals(r2) {
    if (r2 === undefined) {
      return false;
    }
    return this.get('origin') == r2.get('origin') && this.get('size') == r2.get('size');
  },


});
