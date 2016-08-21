import Ember from 'ember';

export default Ember.Object.extend({

  width : -1,
  height : -1,

  formatAsString(width, height) {
    return '{' + width + ', ' + height + '}';
  },

  string : Ember.computed('width', 'height', {
    get : function(key) {
      return this.formatAsString(this.get('width'), this.get('height'));
    },
    set : function(key, val) {
      var m;
      if (m = val.match(/\s*{\s*(\d+)\s*,\s*(\d+)\s*}\s*/)) {
        this.set('width', parseFloat(m[1]));
        this.set('height', parseFloat(m[2]));

        return this.formatAsString(m[1], m[2]);

      }
      else {
        throw new Error("Invalid string for Size");
      }

    }
  }),

  equals(s2) {
    if (s2 === undefined) {
      return false;
    }
    return this.get('width') == s2.get('width') && this.get('height') == s2.get('height');
  },

});
