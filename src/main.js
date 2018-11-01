'use strict';

var React = require('react'),
	createClass = require('create-react-class'),
	DaysView = require('./days'),
	MonthsView = require('./month'),
	YearsView = require('./years').default,
	TimeView = require('./time')
	;

var CalendarContainer = createClass({
	viewComponents: {
		days: DaysView,
		months: MonthsView,
		years: YearsView,
		time: TimeView
	},

	render: function() {
		return React.createElement( this.viewComponents[ this.props.view ], this.props.viewProps );
	}
});

module.exports = CalendarContainer;
