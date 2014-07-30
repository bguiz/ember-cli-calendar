var EmberCalendarHeader = Ember.Component.extend({
    classNames: ['ember-calendar-header'],
    attributeBindings: ['date', 'gridMode'],

    displayText: function() {
        var date = this.get('date');
        return date.format('MMM YYYY');
    }.property('date'),

    actions: {
        changeDate: function(amount) {
            var gridMode = this.get('gridMode');
            //NOTE this does not work, must clone and set
            // this.notifyPropertyChange('date');
            var date = this.get('date').clone().add(gridMode, amount);
            this.set('date', date);
        },

        toggleGridMode: function() {
            var gridMode = this.get('gridMode');
            gridMode = (gridMode === 'month') ? 'week' : 'month';
            this.set('gridMode', gridMode);
        },
    },
});

export default EmberCalendarHeader;
