import React from 'react'
import classNames from 'classnames';

import 'components/DayListItem.scss'


export default function DayListItem(props) {

  let itemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  // returns matching statements based on spots remaining
  function formatSpots() {

    if (props.spots === 0) {
      return 'no spots remaining'
    }
    if (props.spots === 1) {
      return `${props.spots} spot remaining`
    }
    if (props.spots > 1) {
      return `${props.spots} spots remaining`
    }
  };

  return (
    <li className={itemClass} 
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
      data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}