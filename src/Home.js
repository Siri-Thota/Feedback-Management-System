import React from "react";
import web from "../src/images/img2.svg";
import { NavLink } from "react-router-dom";
import Commom from "./Common";

const Home = () => {
  return (
    <>
      <Commom
        imgsrc={web}
        visit="/service"
        btname="Get Started"
      />
    </>
  );
};

export default Home;
