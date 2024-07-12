import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

import React, { useState } from "react";
import Home from "./components/Home";
import WeatherHome from "./weather/page";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./components/Login";
import Signup from "./components/Signup";

const PrivateRoute = ({ enter, ...props }) => {
  const token = localStorage.getItem("enterToken");
  return token ? (
    <Outlet />
  ) : enter ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" />
  );
};

const App = () => {
  
  const queryClient = new QueryClient();
  const [enter, setEnter] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          
          <Route path="/weather" element={<WeatherHome />} />
          <Route path="/login" element={<Login setEnter={setEnter} />} />
          <Route path="/signup" element={<Signup setEnter={setEnter} />} />
          <Route path="" element={<PrivateRoute enter={enter} />}>
          <Route path="/" element={<Home />} />
            <Route path="/weather" element={<WeatherHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
