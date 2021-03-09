import React from 'react';
import './InfoBar.css'

import closeIcon from '../../Icons/closeIcon.png'
import onlineIcon from '../../Icons/onlineIcon.png'

const InfoBar = ({room}) => {
  return(
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online Image"></img>
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close Image"></img></a>
      </div>
    </div>
  )
}

export default InfoBar;