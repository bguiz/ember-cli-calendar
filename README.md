# `ember-cli-calendar`

Calendar component for ember-cli apps

## Usage

    {{ember-calendar
        showEvents=true
        gridMode='month'
        allEvents=eventList
    }}

- When `showEvents` is true, a list of events is shown underneath the calendar
- `allEvents` is an array of event objects, each of which can have optional string attributes: `displayTime`, `title`, and `location`
- `gridMode` can be to initially be either `month` or `week`, user can toggle between them

## Emitted actions

### `selectDate(date)`

Occurs whenever the user selects a different date on the calendar.

### `selectEvent(event)`

Occurs whenever the user selects an event from the event list

## License

GPLv3
