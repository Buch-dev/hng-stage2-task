import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LogoSvgIcon from "./tics-logo";
import Button from "./button";

export default function Header() {
  return (
    <Router>
      <div className="header md:w-[80%] mx-auto bg-[#05252C] flex justify-between items-center px-4 py-3 border border-[#0E464F] rounded-3xl font-jeju mb-6">
        <LogoSvgIcon />
        {/* font: JejuMyeongjo */}
        <div className="hidden routes md:flex gap-6 text-[#B3B3B3] text-base transition-all">
          <Link className="hover:text-[#FFFFFF]" to="/">Events</Link>
          <Link className="hover:text-[#FFFFFF]" to="/my-tickets">My Tickets</Link>
          <Link className="hover:text-[#FFFFFF]" to="/about">About Project</Link>
        </div>
        {/* font: JejuMyeongjo */}
        <Button
          className="bg-[#FFFFFF] text-[#0A0C11] w-[141px] h-[44px] md:w-[169px] md:h-[52px] rounded-lg flex items-center justify-center gap-3 text-sm md:text-base cursor-pointer transition-all hover:bg-[#24A0B5] hover:text-[#D9D9D9]"
          children={"MY TICKETS"}
          withArrow={true}
        />
      </div>
      {/* <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-tickets" element={<Contact />} />
      </Routes> */}
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}
