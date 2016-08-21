import Ember from 'ember';

export default Ember.Component.extend({

  hours       : null,
  minutes     : null,
  seconds     : null,
  color       : 'black',
  image       : 'wake',
  justFaceHeight  : 200,
  timeHeight  : 80,

  faceHeight : Ember.computed('showTime', function() {
    return this.get('showTime')
      ? this.get('justFaceHeight')
      : this.get('justFaceHeight') + this.get('timeHeight')
  }),


  initHook : function() {

    Ember.run.scheduleOnce('afterRender', this, this.vivify);


  }.on('init'),

  click : function() {
    this.set( 'night', ! this.get('night') );
  },

  vivify : function() {
    this.advanceTime();
  },

  updateTime : function() {

	  var now = new Date();

	  this.set('hours', now.getHours());
	  this.set('minutes', now.getMinutes());
	  this.set('seconds', now.getSeconds());

    var night = this.get('hours') < 7 || this.get('hours') >= 19;
    if (this.get('night') != undefined) {
      night = this.get('night');
    }

    var bgColor = 'white';
    var fgColor = 'black';
    var image   = 'wake';

    if (night) {
      fgColor = '#555555';
      bgColor = 'black';
      image = 'sleep';
    }

    this.set('color', fgColor);
    this.set('image', image);
	  document.body.style.backgroundColor = bgColor;

  },

  advanceTime : function() {
    this.updateTime();
    Ember.run.later(this, this.advanceTime, 1000);
  }



});
