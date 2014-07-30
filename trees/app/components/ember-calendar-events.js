var EmberCalendarEvents = Ember.Component.extend({
    classNames: ['ember-calendar-events'],
    attributeBindings: ['currentEvents'],

    actions: {
        selectEvent: function(ev) {
            this.sendAction('selectEvent', ev);
        },
    },
});

export default EmberCalendarEvents;
