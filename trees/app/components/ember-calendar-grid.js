/*globals Ember, moment*/

var EmberCalendarGrid = Ember.Component.extend({
    classNames: ['ember-calendar-grid'],
    attributeBindings: ['mode', 'date', 'allEvents'],

    setup: function() {
        this.onDateChange();
    }.on('init'),

    setupUi: function() {
    }.on('didInsertElement'),

    weekMode: function() {
        return this.get('mode') === 'week';
    }.property('mode'),

    monthMode: function() {
        return this.get('mode') === 'month';
    }.property('mode'),

    today: function() {
        var today = moment();
        return today;
    }.property().volatile(),

    grid: function() {
        var mode = this.get('mode');
        var date = this.get('date');
        var today = this.get('today');
        var grid = [];
        if (mode === 'week') {
            //find first day of this week
            var dayOfWeek = date.day();
            startOfWeek = date.clone().add('days', 0 - dayOfWeek); //last sunday - http://momentjs.com/docs/#/get-set/day/
            var week = [];
            for (var i = 0; i < 7; ++ i) {
                var day = startOfWeek.clone().add('days', i);
                var tag = '';
                if (day.isSame(date, 'day')) {
                    tag = 'current';
                }
                else if (day.isSame(today, 'day')) {
                    tag = 'today';
                }
                var events = this.findEventsOnDay(day);
                week.push({
                    dd: day.date(),
                    mm: day.month(),
                    tag: tag,
                    events: events,
                    hasEvents: (events.length > 0),
                });
            }
            grid.push(week);
        }
        else if (mode === 'month') {
            var startOfMonth = date.clone().add('days', 1 - date.date());
            var month = startOfMonth.month();
            var dayOfWeek = startOfMonth.day();
            var startOfWeek = startOfMonth.clone().add('days', 0 - dayOfWeek); //last sunday - http://momentjs.com/docs/#/get-set/day/
            while (startOfWeek.month() <= month) {
                var week = [];
                for (var i = 0; i < 7; ++i) {
                    var day = startOfWeek.clone().add('days', i);
                    var tag = '';
                    if (day.isSame(date, 'day')) {
                        tag = 'current';
                    }
                    else if (day.isSame(today, 'day')) {
                        tag = 'today';
                    }
                    else if (day.month() < month) {
                        tag = 'past';
                    }
                    else if (day.month() > month) {
                        tag = 'future';
                    }
                    var events = this.findEventsOnDay(day);
                    week.push({
                        dd: day.date(),
                        mm: day.month(),
                        tag: tag,
                        events: events,
                        hasEvents: (events.length > 0),
                    });
                }
                grid.push(week);
                startOfWeek.add('days', 7);
            }
        }
        return grid;
    }.property('mode', 'date', 'allEvents'),

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

    onDateChange: function() {
        var date = this.get('date');
        var currentEvents = this.findEventsOnDay(date);
        this.set('currentEvents', currentEvents);
    }.observes('date'),

    findEventsOnDay: function(day) {
        var eventsByDay = this.get('eventsByDay');
        return eventsByDay[day.format('YYYYMMDD')] || [];
    },

    actions: {
        daySelected: function(day) {
            var date = this.get('date');
            var newDate = date.clone().month(day.mm).date(day.dd);
            this.set('date', newDate);
        },
    },
});

export default EmberCalendarGrid;
