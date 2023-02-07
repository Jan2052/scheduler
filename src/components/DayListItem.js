// import React from "react";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });



  const setSpots = spots => {
    if (!spots){
      return "no spots remaining"
    }
    if (spots === 1){
      return "1 spot remaining"
    }
    if (spots > 1){
      return `${spots} spots remaining`
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {/* {!props.spots && <span>no spots remaining</span>}
        {props.spots === 1 && <span>1 spot remaining</span>}
        {props.spots > 1 && <span>{props.spots}spots remaining</span>} */}
        {setSpots(props.spots)}
      </h3>
    </li>
  );
}

// import React from "react";
// import "components/DayListItem.scss";
// import classNames from "classnames";

//   function formatSpots(spots) {
//     if (!spots) {
//       return 'no spots remaining'
//     }
//     if (spots === 1) {
//       return '1 spot remaining'
//     }
//     if (spots > 1) {
//       return `${spots} spots remaining`
//     }
//   }

// export default function DayListItem(props) {
//   const dayClass = classNames("day-list__item", {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full.": props.spots === 0
//   });

//   return (
//     <li
//       className={dayClass}
//       onClick={()=>props.setDay(props.name)}
//     >
//       <h2 className="text--regular">{props.name}</h2>
//       <h3 className="text--light">{formatSpots(props.spots)}</h3>
//     </li>
//   );
// }