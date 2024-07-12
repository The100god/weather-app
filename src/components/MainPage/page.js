"use client"
import React, { useEffect, useState } from "react";
// import {axios} from 'axios';
// import WeatherDetail from "../WeatherDetail/page";
import { apiTableData } from "../../server/api";
import { useAtom } from "jotai";
import { placeAtom } from "../../atom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoArrowForwardCircle } from "react-icons/io5";

const MainHome = () => {
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line
  const [place, setPlace] = useAtom(placeAtom);
  const [dataOrder, setDataOrder] = useState("name%20ASC");
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    apiTableData(dataOrder, offset).then((res) => {
      setTableData(res.data.results);
    });
    // eslint-disable-next-line
  }, []);

  const handleDataSort = (value) => {
    setDataOrder(value);
    apiTableData(value, offset).then((res) => {
      setTableData(res.data.results);
    });
  };

  const handlePrevPageCount = () => {
    if (pageCount > 0 && offset>=10) {
      setPageCount(pageCount - 1);
      setOffset(offset - 10);
      apiTableData(dataOrder, offset).then((res) => {
        setTableData(res.data.results);
      });
    }
  };

  const handleNextPageCount = () => {
    setPageCount(pageCount + 1);
    setOffset(offset + 10);
    apiTableData(dataOrder, offset).then((res) => {
      setTableData(res.data.results);
    });
  };

  const handleCountInputChange = (e)=>{
    setPageCount(Number(e.target.value))
  }
  // console.log(pageCount)
  const handleEnterKeyPress = (e)=>{
    if (e.code === 'Enter'){
      apiTableData(dataOrder, pageCount*10).then((res) => {
        setTableData(res.data.results);
      });
    }
  }
  // console.log("cityName", cityName)
  // console.log("tableWeatherData", tableData);
  return (
    <div className="flex flex-col w-[100%] overflow-y-auto mb-[50px]">
      <div className="w-full flex justify-end items-center">
        <div className="flex flex-row gap-3 xl:mr-[225px] lg:mr-[105px] md:mr-[30px] sm:mr-[10px] items-center justify-center">
          <input
            type="text"
            name="count"
            id="count"
            className=" w-[70px] px-2 py-3 text-center rounded-md border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Go to"
            onChange={(e)=>handleCountInputChange(e)}
            onKeyPress={(e)=>handleEnterKeyPress(e)}
            
          />
          <span className=" font-[500] gap-2">Page No. <span className="px-2 py-1 border-b-2 border-[#18afba]/75 border-dotted text-gray-600">{pageCount}</span></span>
          <span
            className=" text-4xl hover:opacity-30 cursor-pointer"
            onClick={()=>handlePrevPageCount()}
          >
            <IoArrowBackCircleSharp fill="#18afba"/>
          </span>
          <span
            className=" cursor-pointer text-4xl  hover:opacity-30"
            onClick={()=>handleNextPageCount()}
          >
            <IoArrowForwardCircle fill="#18afba" />
          </span>
        </div>
      </div>
      <div className="overflow-x-auto w-[fit-content] flex flex-col m-auto justify-center items-center">

      <section className="flex justify-center items-center gap-4 px-4 w-full mb-[-10px] mx-auto">
        <div className="flex flex-row justify-between items-center gap-1 text-xs text-black/80 rounded-md mr-[0.6rem]  px-0 py-5 w-[fit-content]">
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            City
            <span className="flex flex-col w-[fit-content] text-[9px] text-black mt-[-16px] gap-2">
              <span
                className=" cursor-pointer opacity-30 w-[fit-content] h-[9px] hover:opacity-100"
                onClick={() => handleDataSort("name%20ASC")}
              >
                ▲
              </span>
              <span
                className=" cursor-pointer w-[fit-content] h-[9px] opacity-30 hover:opacity-100"
                onClick={() => handleDataSort("name%20DESC")}
              >
                ▼
              </span>
            </span>
          </p>
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            Country Name
            <span className="flex flex-col justify-center items-center w-[fit-content] text-[9px] text-black mt-[-16px] gap-2">
              <span
                className=" cursor-pointer opacity-30 p-0 w-[fit-content] h-[9px] hover:opacity-100"
                onClick={() => handleDataSort("cou_name_en%20ASC")}
              >
                ▲
              </span>
              <span
                className=" cursor-pointer w-[fit-content] h-[9px] opacity-30 hover:opacity-100"
                onClick={() => handleDataSort("cou_name_en%20DESC")}
              >
                ▼
              </span>
            </span>
          </p>
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            Country Code
          </p>
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            Longtude
          </p>
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            Latitude
          </p>
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            Timezone
          </p>
          <p className=" flex justify-center items-center text-lg font-semibold bg-white w-[150px] gap-2 py-3 rounded-md ">
            Population
            <span className="flex flex-col w-[fit-content] text-[9px] text-black mt-[-16px] gap-2">
              <span
                className=" cursor-pointer opacity-30 w-[fit-content] h-[9px] hover:opacity-100"
                onClick={() => handleDataSort("population%20ASC")}
              >
                ▲
              </span>
              <span
                className=" cursor-pointer w-[fit-content] h-[9px] opacity-30 hover:opacity-100"
                onClick={() => handleDataSort("population%20DESC")}
              >
                ▼
              </span>
            </span>
          </p>
        </div>
      </section>
      <section className=" overflow-y-auto flex justify-center gap-4 pb-2 px-4 w-full h-[500px] pt-[7px]">
        <div className="flex flex-col justify-between gap-1 items-center text-xs text-black/80 rounded-md py-2 w-[fit-content]">
          {tableData.map((d, i) => (
            <div
              key={i}
              className=" flex flex-row justify-center gap-1 text-lg w-full py-1 rounded-md "
            >
              <p
                className=" flex justify-center items-center text-center hover:text-[#18afba] text-sm bg-white w-[150px] py-3 rounded-md cursor-pointer"
                onClick={() => {
                  setPlace(d.name);
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {d.name}
              </p>
              <p
                className=" flex justify-center items-center text-center text-sm bg-white hover:text-[#18afba] w-[150px] py-3 rounded-md cursor-pointer"
                onClick={() => {
                  setPlace(d.cou_name_en);
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {d.cou_name_en}
              </p>
              <p className=" flex justify-center items-center text-center text-sm bg-white w-[150px] py-3 rounded-md ">
                {d.country_code}
              </p>
              <p className=" flex justify-center items-center text-center text-sm bg-white w-[150px] py-3 rounded-md ">
                {d.coordinates.lon}°
              </p>
              <p className=" flex justify-center items-center text-center text-sm bg-white w-[150px] py-3 rounded-md ">
                {d.coordinates.lat}°
              </p>
              <p className=" flex justify-center items-center text-center text-sm bg-white w-[150px] py-3 rounded-md ">
                {d.timezone}
              </p>
              <p className=" flex justify-center items-center text-center text-sm bg-white w-[150px] py-3 rounded-md ">
                {d.population}
              </p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default MainHome;
