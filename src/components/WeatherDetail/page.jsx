import React from 'react'
import { LuEye } from "react-icons/lu";
import { CiDroplet } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { WiSunrise } from "react-icons/wi";
import { BsSunset } from "react-icons/bs";



const WeatherDetail = (props) => {

    const WeatherDetailProps = [
    {
        "icon":<LuEye />,
        "information":"Visability",
        "value":props.visability
    },
    {
        "icon":<CiDroplet />,
        "information":"Humidity",
        "value":props.humidity
    },
    {
        "icon":<FaWind />,
        "information":"WindSpeed",
        "value":props.windSpeed
    },
    {
        "icon":<IoMdSpeedometer />,
        "information":"Airpressure",
        "value":props.airPressure
    },
    {
        "icon":<WiSunrise />,
        "information":"Sunrise",
        "value":props.sunrise
    },
    {
        "icon":<BsSunset />,
        "information":"Sunset",
        "value":props.sunset
    },
]
  return (
    <>
      {WeatherDetailProps.map((data, i)=>(

      <SingleWeatherDetail key={i}
        icon={data.icon}
        information={data.information}
        value={data.value}
      />
      ))
      }
    </>
  )
}

export default WeatherDetail

const SingleWeatherDetail = (props)=>{
    const {information, icon, value} = props
return (
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
        <p className=" whitespace-nowrap font-bold text-[1rem]">
            {information}
        </p>
        <div className=" text-3xl">{icon}</div>
        <p>{value}</p>
    </div>
)
}


