'use strict';
/*globals module, require*/

var path = require('path');
var fs = require('fs');

function EmberCliCalendar(project) {
    this.project = project;
    this.name = 'ember-cli-calendar';
}

function unwatchedTree(dir) {
    return {
        read: function() { return dir; },
        cleanup: function() { /* do nothing */ },
    };
}

EmberCliCalendar.prototype.treeFor = function treeFor(name) {
    var treepath = path.normalize('node_modules/ember-cli-calendar/trees/'+name);
    return (fs.existsSync(treepath)) ? unwatchedTree(treepath) : null;
};

EmberCliCalendar.prototype.included = function included(app) {
    this.app = app;
    this.app.import('vendor/ember-cli-calendar/styles/styles.css');
};

module.exports = EmberCliCalendar;
