/*globals Ember, moment*/

var EmberCalendar = Ember.Component.extend({
    classNames: ['ember-calendar'],
    attributeBindings: ['showEvents', 'gridMode', 'allEvents'],

    eventsByDay: function() {
        var events = this.get('allEvents');
        if (!events) {
            return {};
        }
        var hash = {};
        events.forEach(function(ev) {
            var key = moment(ev.start).format('YYYYMMDD');
            var val = hash[key];
            if (!val) {
                val = [];
            }
            val.push(ev);
            hash[key] = val;
        });
        return hash;
    }.property('allEvents', 'allEvents.@each'),

    currentEvents: function() {
        var date = this.get('date');
        var eventsByDay = this.get('eventsByDay');
        return EmberCalendar.findEventsOnDay(eventsByDay, date);
    }.property('date', 'eventsByDay'),

    setup: function() {
        var date = this.get('date');
        if (!date || !moment.isMoment(date)) {
            var now = moment();
            this.set('date', now);
        }
    }.on('init'),

    setupUi: function() {
    }.on('didInsertElement'),

    onChangeDate: function() {
        this.sendAction('selectDate', this.get('date'));
    }.observes('date'),

    actions: {
        selectEvent: function(ev) {
            //Just bubbling
            this.sendAction('selectEvent', ev);
        },
    },
});

EmberCalendar.reopenClass({
    findEventsOnDay: function(eventsByDay, day) {
        return eventsByDay[day.format('YYYYMMDD')] || [];
    },
});

export default EmberCalendar;
