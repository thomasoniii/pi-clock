import Ember from 'ember';

export default Ember.Component.extend({
  hours   : null,
  minutes : null,
  seconds : null,
  color : 'black',
  bgColor : 'white',
  displaySeconds : false,

  formattedTime : function(key) {
    var val = this.get(key);

    if (val < 10) {
      val = "0" + val;
    }
    return val;
  },

  formattedHours : Ember.computed('hours', function() {
    return this.get('hours') > 12
      ? this.get('hours') - 12
      : this.get('hours')
  }),

  formattedMinutes : Ember.computed('minutes', function() {
    return this.formattedTime('minutes');
  }),

  formattedSeconds : Ember.computed('seconds', function() {
    return this.formattedTime('seconds');
  }),

  meridian : Ember.computed('hours', function() {
    return this.get('hours') >= 12 ? 'PM' : 'AM';
  }),

});
