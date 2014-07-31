/*globals Ember, moment*/

import EmberCalendar from './ember-calendar';

var EmberCalendarGrid = Ember.Component.extend({
    classNames: ['ember-calendar-grid'],
    attributeBindings: ['mode', 'date', 'eventsByDay'],

    setup: function() {
    }.on('init'),

    setupUi: function() {
    }.on('didInsertElement'),

    today: function() {
        var today = moment();
        return today;
    }.property().volatile(),

    updateGridTags: function() {
        var grid = this.get('cachedGrid');
        if (!grid) {
            return;
        }
        var date = this.get('date');
        var dd = date.date();
        var mm = date.month();
        var today = this.get('today');
        var ddToday = today.date();
        var mmToday = today.month();
        grid.forEach(function(week) {
            week.forEach(function(day) {
                if (day.dd === dd && day.mm === mm) {
                    Ember.set(day, 'tag','current');
                }
                else if (day.dd === ddToday && day.mm === mmToday) {
                    Ember.set(day, 'tag','today');
                }
                else if (day.mm < mm) {
                    Ember.set(day, 'tag','past');
                }
                else if (day.mm > mm) {
                    Ember.set(day, 'tag','future');
                }
                else {
                    Ember.set(day, 'tag', null);
                }
            });
        });
        this.set('cachedGrid', grid);
    },

    onModeOrEventsByDayChange: function() {
        this.set('cachedGridStart', null);
    }.observes('eventsByDay', 'mode'),

    grid: function() {
        var mode = this.get('mode');
        var date = this.get('date');
        var today = this.get('today');
        var eventsByDay = this.get('eventsByDay');
        var cachedGridStart = this.get('cachedGridStart');
        var grid = [];
        if (mode === 'week') {
            //find first day of this week
            var dayOfWeek = date.day();
            startOfWeek = date.clone().add('days', 0 - dayOfWeek);
            if (startOfWeek.isSame(cachedGridStart, 'day')) {
                this.updateGridTags();
                return this.get('cachedGrid');
            }
            cachedGridStart = startOfWeek.clone();
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
                var events = EmberCalendar.findEventsOnDay(eventsByDay, day);
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
            var startOfWeek = startOfMonth.clone().add('days', 0 - dayOfWeek);
            if (startOfWeek.isSame(cachedGridStart, 'day')) {
                this.updateGridTags();
                return this.get('cachedGrid');
            }
            cachedGridStart = startOfWeek.clone();
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
                    var events = EmberCalendar.findEventsOnDay(eventsByDay, day);
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
        this.set('cachedGrid', grid);
        this.set('cachedGridStart', cachedGridStart);
        return grid;
    }.property('mode', 'date', 'eventsByDay'),

    actions: {
        daySelected: function(day) {
            var date = this.get('date');
            var newDate = date.clone().month(day.mm).date(day.dd);
            this.set('date', newDate);
        },
    },
});

export default EmberCalendarGrid;
