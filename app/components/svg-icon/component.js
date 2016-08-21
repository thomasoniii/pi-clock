import Ember from 'ember';

export default Ember.Component.extend({

  initHook : function() {

    this.imageFlips = {
      wake : true
    };

  }.on('init'),

  didInsertHook : function() {
    Ember.run.scheduleOnce('afterRender', this, this.introspect);
  }.on('didRender'),

  imageAnchor : Ember.computed('image', function() {
    return '#' + this.get('image');
  }),

  introspect : function() {

    var node  = document.getElementById( this.get('image') );

    var box   = node.getBBox();

    var svgBox = node.parentNode.parentNode.getBoundingClientRect();

    var hRatio = svgBox.width  / box.width;
    var vRatio = svgBox.height / box.height;

    var ratio = hRatio < vRatio //box.width > box.height
      ? hRatio
      : vRatio;

    ratio *= 0.90;

    var flipOffset = 0;
    var flipScale = 1;

    if ( this.imageFlips[ this.get('image') ] ) {
      flipOffset = box.width * ratio;
      flipScale = -1;
    }

    this.set('transformation',
      'translate('
        + (svgBox.width / 2 - box.width * ratio / 2 - ratio * box.x + flipOffset)
        + ','
        + (svgBox.height / 2 - box.height * ratio / 2 - ratio * box.y)
      + ') '
      + 'scale(' + (flipScale * ratio) + ',' + ratio + ')');
  },

});
