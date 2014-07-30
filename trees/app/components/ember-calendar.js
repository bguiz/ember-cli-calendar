/*globals Ember, moment*/

var EmberCalendar = Ember.Component.extend({
    classNames: ['ember-calendar'],
    attributeBindings: ['showEvents', 'gridMode', 'allEvents'],

    setup: function() {
        var date = this.get('date');
        if (!date || !moment.isMoment(date)) {
            var now = moment();
            this.set('date', now);
        }
    }.on('init'),

    setupUi: function() {
    }.on('didInsertElement'),

    actions: {
        selectEvent: function(ev) {
            //Just bubbling
            this.sendAction('selectEvent', ev);
        },
    },
});

export default EmberCalendar;
