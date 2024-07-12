import React from 'react'
import Container from '../Container/page'
import WeatherIcon from '../weatherIcon/page'
// import convertKelvinToCelsius from '@/utils/convertKelvinToCelsius';
import WeatherDetail from '../WeatherDetail/page';

const ForcastWeatherDetail = (props) => {
    const {weatherIcon, date, day, temp, feels_like, temp_min, temp_max, description} = props;
  return (
    <Container className="gap-4 flex flex-col sm:flex-row">
    {/* left */}
      <section className='flex gap-4 items-center px-4 justify-center'>
        <div className='flex flex-col gap-1 items-center mt-[-20px]'>
            <WeatherIcon iconname={weatherIcon}/>
            <p>{date}</p>
            <p className=" text-sm font-semibold">{day}</p>
        </div>

        {/*  */}
        <div className="flex flex-col px-4 gap-1 items-center justify-center ">
            {/* <span className=' text-5xl'>{convertKelvinToCelsius(temp ?? 0)}°</span> */}
            <span className=' text-4xl'>{temp}</span>
            <p className=' text-xs space-x-1 whitespace-nowrap'>
                <span> Feels like</span>
                <span>{feels_like}</span>
            </p>
            <p className="flex flex-row text-xs">
                  <span className='p-1'>
                    {temp_min}↓{" "}
                  </span>
                  <span className='p-1'>
                    {temp_max}↑{" "}
                  </span>
                </p>
            <p className='capitalize'>{description}</p>
        </div>
      </section>
      {/* right */}
      <section className=' overflow-x-auto flex justify-between gap-4 px-4 py-4  pr-10 w-full'>
        <WeatherDetail {...props}/>
      </section>
    </Container>
  )
}

export default ForcastWeatherDetail
