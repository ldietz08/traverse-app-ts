import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import LandingPage from "./pages/landing-page/LandingPage";
import ExplorePage from "./pages/explore/ExplorePage";
import Favorites from "./components/favorites/Favorites";
import Auth from "./pages/login/Login";
import Bulletin from "./pages/bulletin/Bulletin";
import Footer from "./components/footer/Footer";
import HikeInfo from "./pages/hike-info/HikeInfo";
import "./App.scss";


export const App: FC = () => {
  const [hikes, setHikes] = useState<Hikes[]>([]);

  const BACK_END_URL: string = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    const getHikes = async () => {
      try {
        const { data } = await axios.get(BACK_END_URL);
        setHikes(data);
        console.log(data);
      } catch (error) {
        console.log("An error has occurred", error);
      }
    };
    getHikes();
  }, []);
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="hikes" element={<ExplorePage hikes={hikes} />} />
            <Route path="hikes/:id" element={<HikeInfo hikes={hikes} />} />
            <Route path="bulletin" element={<Bulletin />} />
            <Route path="favorites" element={<Favorites hikes={hikes} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};
