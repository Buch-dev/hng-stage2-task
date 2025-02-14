import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Techember from "./Techember";
import Button from "./button";
import ArrowDownIcon from "./arrow-down";
import usePersistedState from "../hooks/usePersistedState";
import DragDropIcon from "./drag-drop";
import MessageIcon from "./message";
import axios from "axios";
import CardBg from "./CardTicket";
import TicketTitle from "./ticket-title";
import BarCode from "./BarCode";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = usePersistedState("fullName", "");
  const [email, setEmail] = usePersistedState("email", "");
  const [errors, setErrors] = useState({});
  const [ticketType, setTicketType] = useState("");
  const [ticketNo, setTicketNo] = useState(1);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const savedAvatarUrl = localStorage.getItem("avatarUrl");
    if (savedAvatarUrl) {
      setAvatarUrl(savedAvatarUrl);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    console.log("Validating form...");
    console.log("fullName:", fullName);
    console.log("email:", email);
    console.log("ticketType:", ticketType);
    console.log("ticketNo:", ticketNo);

    if (!ticketType) {
      newErrors.ticketType = "Ticket type is required";
    }
    if (!ticketNo || ticketNo < 1) {
      newErrors.ticketNo = "Number of tickets must be at least 1";
    }
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL for the selected file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_buch_preset"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcyhuwujh/image/upload",
        formData
      ); // Replace with your Cloudinary cloud name
      setAvatarUrl(response.data.secure_url);
      localStorage.setItem("avatarUrl", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    console.log("Next button clicked");
    if (validateForm()) {
      console.log("Validation passed");
      setStep(step + 1);
    } else {
      console.log("Validation failed", errors);
    }
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <div className="w-full m-auto md:w-[700px] border border-[#0E464F] rounded-4xl p-5 md:p-8 bg-[#041E23]">
      <ProgressBar currentStep={step} totalSteps={3} />
      <div className=" md:bg-[#08252B] md:border md:border-[#0E464F] md:p-6 md:rounded-2xl">
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <div className="bg-gradient-to-b from-[#08252B] to-[#0A0C11] p-4 md:p-6 rounded-2xl border border-[#07373F] bg-rotate-90">
              <div className="flex flex-col gap-4 items-center text-white rounded-2xl text-sm md:text-base text-center font-roboto">
                <Techember className={"w-[100%]"} />
                {/* font: Roboto */}
                <p>
                  Join us for an unforgettable experience at <br /> [Event
                  Name]! Secure your spot now.
                </p>
                <p>📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
              </div>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[4px] bg-[#07373F] my-8" />

            {/* Select ticket type component */}
            <div className="text-white">
              <div className="bg-[#052228] border border-[#07373F] rounded-2xl p-4 flex flex-col items-center justify-between gap-3 md:flex-row">
                <button
                  type="button"
                  onClick={() => setTicketType("REGULAR ACCESS")}
                  className="border-2 border-[#07373F] rounded-2xl flex flex-col-reverse gap-3 justify-between p-2 hover:border hover:bg-[#2C545B] hover:border-[#197686] cursor-pointer transition-all w-full md:w-[158px]"
                >
                  <div className="flex flex-col items-start">
                    <p className="text-base font-roboto">REGULAR ACCESS</p>
                    <p className="text-sm font-roboto">20/52</p>
                  </div>
                  <div className="price flex items-center justify-end font-semibold text-2xl font-roboto">
                    Free
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketType("VIP ACCESS")}
                  className="border-2 border-[#07373F] rounded-2xl flex flex-col-reverse gap-3 justify-between p-2 hover:border hover:bg-[#2C545B] hover:border-[#197686] cursor-pointer transition-all w-full md:w-[158px]"
                >
                  <div className="flex flex-col items-start">
                    <p className="text-base font-roboto">VIP ACCESS</p>
                    <p className="text-sm font-roboto">20/52</p>
                  </div>
                  <div className="price flex items-center justify-end font-semibold text-2xl font-roboto">
                    $50
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setTicketType("VVIP ACCESS")}
                  className="border-2 border-[#07373F] rounded-2xl flex flex-col-reverse gap-3 justify-between p-2 hover:border hover:bg-[#2C545B] hover:border-[#197686] cursor-pointer transition-all w-full md:w-[158px]"
                >
                  <div className="flex flex-col items-start">
                    <p className="text-base font-roboto">VVIP ACCESS</p>
                    <p className="text-sm font-roboto">20/52</p>
                  </div>
                  <div className="price flex items-center justify-end font-semibold text-2xl font-roboto">
                    $150
                  </div>
                </button>
              </div>
              {errors.ticketType && (
                <p className="text-red-500">{errors.ticketType}</p>
              )}
            </div>

            {/* Number of tickets component */}
            <div className="text-white mt-8 font-roboto">
              <h3 className="text-base">Number of Tickets</h3>
              <div className="relative">
                <select
                  className="w-full h-12 rounded-2xl border border-[#07373F] outline-none px-4 text-white bg-[#041E23] appearance-none"
                  value={ticketNo}
                  onChange={(e) => setTicketNo(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <ArrowDownIcon />
                </div>
              </div>
              {errors.ticketNo && (
                <p className="text-red-500">{errors.ticketNo}</p>
              )}
            </div>

            {/* Next button */}
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-6 mt-8 font-jeju">
              <Button
                type={"submit"}
                children={"Cancel"}
                className={
                  "bg-[#041E23] text-[#24A0B5] border border-[#0E464F] w-full md:w-[270px] h-[48px] rounded-xl cursor-pointer hover:text-[#FFF] hover:bg-[#24A0B5] transition-all"
                }
              />
              <Button
                type={"submit"}
                children={"Next"}
                className={
                  "bg-[#041E23] text-[#24A0B5] border border-[#0E464F] hover:text-[#FFF] hover:bg-[#24A0B5] w-full md:w-[270px] h-[48px] rounded-xl cursor-pointer transition-all"
                }
              />
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="flex flex-col gap-8">
            {/* Upload profile photo */}
            <div className="bg-[#052228] border border-[#07373F] rounded-2xl p-4 font-roboto">
              {/* font: Roboto */}
              <label htmlFor="avatar" className="text-white">
                Upload Profile Photo{" "}
              </label>
              <div className="relative bg-transparent flex items-center justify-center mt-2 md:bg-[#02191D]">
                <input
                  type="file"
                  id="avatar"
                  onChange={handleAvatarUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="flex flex-col gap-5 items-center justify-center border border-dashed bg-[#0E464F] border-[#07373F] rounded-3xl p-4 text-white w-60 h-60 text-center relative">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Avatar Preview"
                      className="w-full h-full rounded-3xl object-cover absolute inset-0"
                    />
                  )}
                  <div className="flex flex-col items-center justify-center z-10 opacity-75">
                    <DragDropIcon />
                    <p>Drag and drop or click to upload</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Horizontal Line */}
            <div className="w-full h-[4px] bg-[#07373F] mt-8" />

            {/* Enter name input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-white">
                Enter your name
              </label>
              <input
                className="w-full h-12 rounded-2xl border border-[#07373F] outline-none px-2 text-white"
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-required="true"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Enter email input */}
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="email" className="text-white">
                Enter your email*
              </label>
              <input
                className="w-full h-12 rounded-2xl border border-[#07373F] outline-none px-12 text-white"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <MessageIcon className="absolute left-4 bottom-4" />
            </div>

            {/* About the project */}
            <div className="flex flex-col gap-2">
              <label htmlFor="textarea" className="text-white">
                About the project
              </label>
              <textarea
                className="w-full h-[127px] rounded-2xl border border-[#07373F] outline-none p-4 text-white"
                name="textarea"
                id="textarea"
              ></textarea>
            </div>

            {/* Next button */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between md:gap-6 mt-8 font-jeju">
              <Button
                onClick={handlePrevStep}
                children={"Back"}
                className={
                  "bg-[#041E23] text-[#24A0B5] border border-[#0E464F] w-full md:w-[270px] h-[48px] rounded-xl cursor-pointer hover:text-[#FFF] hover:bg-[#24A0B5] transition-all"
                }
              />
              <Button
                children={"Get my Free Ticket"}
                className={
                  "bg-[#041E23] text-[#24A0B5] border border-[#0E464F] hover:text-[#FFF] hover:bg-[#24A0B5] w-full md:w-[270px] h-[48px] rounded-xl cursor-pointer transition-all"
                }
              />
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="ticket text-white flex flex-col items-center">
            {/* Alatsi */}
            <h2 className="text-[32px] mb-4 font-alatsi">
              Your Ticket is Booked!
            </h2>
            {/* Roboto */}
            <p className="text-base font-roboto">
              Check your email for a copy or you can download
            </p>
            <div className="mt-8 flex flex-col items-center pt-8 relative">
              <CardBg />
              <div className="absolute flex flex-col items-center top-[53px] w-[260px] h-[446px] border border-[#24A0B5] rounded-2xl font-roboto">
                <Techember className={"w-[80%] mt-4"} />
                {/* Roboto */}
                <p className="text-[10px]">📍 04 Rumens road, Ikoyi, Lagos</p>
                <p className="text-[10px]">📅 March 15, 2025 | 7:00 PM</p>
                <div className="image-container w-[140px] h-[140px] rounded-[12px] border-4 border-[#24A0B5] mt-6">
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full rounded-[12px]"
                    />
                  )}
                </div>
                <div className="w-[232px] h-[160px] rounded-lg bg-[#08343C] border border-[#133D44] mt-5 relative p-1">
                  {/* input details on card */}
                  <div className="grid grid-cols-2 absolute w-[96.5%]">
                    <div className="border border-[#133D44] border-t-0 border-l-0">
                      {/* Roboto */}
                      <label className="text-[10px] opacity-33">
                        Enter your name
                      </label>
                      <p className="text-xs font-bold">{fullName}</p>
                    </div>
                    <div className="border border-[#133D44] border-t-0 border-r-0 pl-2.5 pb-2.5">
                      {/* Roboto */}
                      <label className="text-[10px] opacity-33">
                        Enter your email*
                      </label>
                      <p className="text-xs font-bold">{email}</p>
                    </div>
                    <div className="border border-[#133D44] border-l-0 border-t-0 pb-1">
                      {/* Roboto */}
                      <label className="text-[10px] opacity-33">
                        Ticket Type:
                      </label>
                      <p className="text-[10px]">{ticketType}</p>
                    </div>
                    <div className="border border-[#133D44] border-t-0 border-r-0 pl-2.5">
                      {/* Roboto */}
                      <label className="text-[10px] opacity-33">
                        Ticket for:
                      </label>
                      <p className="text-[10px]">{ticketNo}</p>
                    </div>
                  </div>
                  <div className=" mt-[102px]">
                    <p className="opacity-33 text-[10px]">Special request?</p>
                    <p className="text-[10px] text-white mt-1">
                      Nil ? Or the users sad story they write in there gets this
                      whole space, Max of three rows
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-8 font-jeju w-full">
                <Button
                  onClick={handlePrevStep}
                  children={"Book Another Ticket"}
                  className={
                    "bg-[#041E23] text-[#24A0B5] border border-[#0E464F] w-full md:w-[270px] h-[48px] rounded-xl cursor-pointer hover:text-[#FFF] hover:bg-[#24A0B5] transition-all"
                  }
                />
                <Button
                  onClick={() => alert("Ticket confirmed!")}
                  children={"Download Ticket"}
                  className={
                    "bg-[#041E23] text-[#24A0B5] border border-[#0E464F] hover:text-[#FFF] hover:bg-[#24A0B5] w-full md:w-[270px] h-[48px] rounded-xl cursor-pointer transition-all"
                  }
                />
              </div>
              <BarCode
                className={"absolute bottom-[10.5rem] md:bottom-[6.5rem]"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
