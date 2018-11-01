'use strict';

import React from 'react';

class DateTimePickerYears extends React.Component {
	render(){
		var year = parseInt( this.props.viewDate.year() / 10, 10 ) * 10;

		return (
			<div className="date-picker__years">
				<table>
					<thead>
						<tr>
							<th onClick={this.props.subtractTime( 10, 'years' )} className='date-picker__prev'>
								<span>‹</span>
							</th>
							<th onClick={this.props.showView( 'years' )} colSpan="2" className='date-picker__switch'>
								{year + '-' + ( year + 9 )}
							</th>
							<th onClick={this.props.addTime( 10, 'years' )} className='date-picker__next'>
								<span>›</span>
							</th>
						</tr>
					</thead>
				</table>
				<table>
					<tbody>
						{this.renderYears( year )}
					</tbody>
				</table>
			</div>
		)

	}

	renderYears( year ) {
		var years = [],
			i = -1,
			rows = [],
			renderer = this.props.renderYear || this.renderYear,
			selectedDate = this.props.selectedDate,
			isValid = this.props.isValidDate || this.alwaysValidDate,
			classes, props, currentYear, isDisabled, noOfDaysInYear, daysInYear, validDay,
			// Month and date are irrelevant here because
			// we're only interested in the year
			irrelevantMonth = 0,
			irrelevantDate = 1
			;

		year--;
		while (i < 11) {
			classes = 'date-picker__year';
			currentYear = this.props.viewDate.clone().set(
				{ year: year, month: irrelevantMonth, date: irrelevantDate } );

			// Not sure what 'date-picker__last' is for, commenting out for now as it's not working properly
			// if ( i === -1 | i === 10 )
				// classes += ' date-picker__last';

			noOfDaysInYear = currentYear.endOf( 'year' ).format( 'DDD' );
			daysInYear = Array.from({ length: noOfDaysInYear }, function( e, i ) {
				return i + 1;
			});

			validDay = daysInYear.find(function( d ) {
				var day = currentYear.clone().dayOfYear( d );
				return isValid( day );
			});

			isDisabled = ( validDay === undefined );

			if ( isDisabled )
				classes += ' date-picker--disabled';

			if ( selectedDate && selectedDate.year() === year )
				classes += ' date-picker--active';

			props = {
				key: year,
				'data-value': year,
				className: classes
			};

			if ( !isDisabled )
				props.onClick = ( this.props.updateOn === 'years' ?
					this.updateSelectedYear : this.props.setDate('year') );

			years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

			if ( years.length === 4 ) {
				rows.push( <tr key={i}>{years}</tr> );
				years = [];
			}

			year++;
			i++;
		}

		return rows;
	}

	updateSelectedYear( event ) {
		this.props.updateSelectedDate( event );
	}

	renderYear( props, year ) {
		return <td {...props}>{year}</td>;
	}

	alwaysValidDate() {
		return 1;
	}
}

export default DateTimePickerYears;
