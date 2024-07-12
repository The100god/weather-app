"use client";
import React, { useState } from "react";
// import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "../SearchBox/page";
import axios from "axios";
import { historyDataList, loadingCityAtom, placeAtom } from "../../atom";
import { useAtom } from "jotai";
import { IoIosHeartEmpty } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import icon from "../../assets/icon.svg";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_WEATHER_KEY;
const Navbar = (props) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  //
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // eslint-disable-next-line
  const [place, setPlace] = useAtom(placeAtom);
  // eslint-disable-next-line
  const [_, setLoadingCity] = useAtom(loadingCityAtom);
  const [toggleWishlist, setToggleWishlist] = useState(false);
  const [toggleHistorylist, setToggleHistoryList] = useState(false);
  const [historyList, setHistoryList] = useAtom(historyDataList);
  const navigate = useNavigate();

  const handleInputOnChange = async (value) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        const suggestions = response.data.list.map((item) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (value) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleSubmitSearch = (e) => {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  };

  const handleHistoryRemove = (index) => {
    // console.log("index", index)
    const newArray = [];
    for (let i = 0; i < historyList.length; i++) {
      if (i !== index) {
        newArray.push(historyList[i]);
      }
    }

    setHistoryList(newArray);

    localStorage.setItem("hisList", newArray);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleLogout = ()=>{
    localStorage.removeItem("enterToken")
    navigate("/login")
    
  }

  return (
    <>
      <nav className=" shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2">
            {/* <h2 className=" text-gray-500 text-3xl">Weather</h2> */}
            <img src={icon} alt="Weather" width={60} height={50} />
          </p>
          <div className="flex flex-row gap-2 justify-center items-center">
            <MdOutlineLocationOn fill="#18afba" className=" text-3xl" />
            <p className=" text-black-900 font-semibold mt-[7px] ml-[-8px] text-[15px] pb-1 mr-2 border-b-2 border-[#18afba]">
              {props.location}
            </p>
            <div className="relative hidden md:flex">
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputOnChange(e.target.value)}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </div>
          </div>
          <section className="flex gap-3 items-center">
            <div className="relative">
              <span className="text-[25px] mr-[8px] ml-3 cursor-pointer">
                <IoIosHeartEmpty
                  title="Wishlist"
                  fill="red"
                  onClick={() => setToggleWishlist(!toggleWishlist)}
                />
              </span>

              {toggleWishlist && (
                <div className=" absolute bg-white top-[70px] left-[-153px] w-[180px] items-center justify-center max-h-[200px] overflow-y-auto rounded-md  shadow-lg">
                  {props.favouriteList.length > 0 && (
                    <ul className=" justify-center items-center w-full  py-[10px]">
                      {props.favouriteList.map((f, i) => (
                        <li
                          key={i}
                          className=" flex flex-row justify-between items-center px-[15px] w-full text-md hover:bg-[#18afba] mb-1 hover:text-white cursor-pointer"
                        >
                          <span
                            className="w-full"
                            onClick={() => {
                              setPlace(f);
                              setToggleWishlist(!toggleWishlist);
                            }}
                          >
                            {capitalize(f)}
                          </span>
                          <span
                            className="text-white "
                            onClick={() => props.handleRemoveFavourite(f)}
                          >
                            <RxCrossCircled />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <span className="text-[20px] mr-[8px] ml-3 cursor-pointer">
                <FaHistory
                  title="History"
                  fill="#18afba"
                  onClick={() => setToggleHistoryList(!toggleHistorylist)}
                />
              </span>
              {toggleHistorylist && (
                <div className=" absolute bg-white top-[70px] left-[-153px] w-[180px] items-center justify-center max-h-[200px] overflow-y-auto rounded-md  shadow-lg">
                  {historyList.length > 0 && (
                    <ul className=" justify-center items-center w-full  py-[10px]">
                      {historyList.map((h, index) => (
                        <li
                          key={index}
                          className=" flex flex-row justify-between items-center px-[15px] w-full text-md hover:bg-[#18afba] mb-1 hover:text-white cursor-pointer"
                        >
                          <span
                            className="w-full"
                            onClick={() => {
                              setPlace(h);
                              setToggleHistoryList(!toggleHistorylist);
                            }}
                          >
                            {capitalize(h)}
                          </span>
                          <span
                            className="text-white "
                            onClick={() => handleHistoryRemove(index)}
                          >
                            <RxCrossCircled />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <span
              title="My Current Location"
              className="px-2 py-1 text-sm md:text-md rounded-[5px] font-[600] text-[white] bg-[#18afba] hover:opacity-80 cursor-pointer"
              onClick={handleCurrentLocation}
            >
              My Location
            </span>
            <span
              
              className="px-2 py-1 text-sm md:text-md rounded-[5px] font-[600] text-[white] bg-[#18afba] hover:opacity-80 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputOnChange(e.target.value)}
          />
          <SuggestionBox
            {...{ showSuggestions, suggestions, handleSuggestionClick, error }}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;

// suggestions component

const SuggestionBox = (props) => {
  const { showSuggestions, suggestions, handleSuggestionClick, error } = props;
  return (
    <>
      {" "}
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className=" mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className=" text-red-500">{error}</li>
          )}

          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className=" cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
