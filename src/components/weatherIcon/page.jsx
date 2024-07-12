import React from 'react'

import { cn } from '../../utils/cn'
const WeatherIcon = (props) => {
  return (
    <div title={props.iconname} {...props} className={cn("relative h-20 w-20")}>
      <img
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconname?props.iconname:"04d"}@4x.png`}
      />
    </div>
  )
}

export default WeatherIcon
