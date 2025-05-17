'use client'
import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { MdArrowRightAlt } from "react-icons/md";

function Why() {
  const [title, setTitle] = useState("flex");
  return (
    <div className="bg-red relative z-12 w-full text-[#3a474f]">
      <span className="flex items-center justify-center">
        <img
          alt="community"
          src="community.jpg"
          className="relative object-cover h-[1200px] lg:h-[800px] mt-[-20px] w-full "
        />
        <div className="z-10 absolute top-0 py-8 px-4">
          <h2 className="text-3xl font-bold">
            Why Choose PrimeChoice Care?
          </h2>
          <div className="relative mt-14 md:flex">
            <div className=" absolute top-[-24px]  ml-[5%] lg:left-[-180px] lg:w-[280px] bg-white w-[90%] pt-5 rounded-xl font-bold text-xl ">
              <h2
                onClick={() => setTitle("flex")}
                className={`${
                  title === "flex"
                    ? "text-orange-400 px-5 border-b py-6 cursor-pointer"
                    : "border-b px-5 border-gray-200 py-6 cursor-pointer"
                }`}
              >
                FlexChange Support
              </h2>
              <h2
                onClick={() => setTitle("priority")}
                className={`${
                  title === "priority"
                    ? "text-orange-400 px-5 border-b py-6 cursor-pointer"
                    : "border-b px-5 border-gray-200 py-6 cursor-pointer"
                }`}
              >
                Priority-Centric Care
              </h2>
              <h2
                onClick={() => setTitle("swift")}
                className={`${
                  title === "swift"
                    ? "text-orange-400 px-5 border-b py-6 cursor-pointer"
                    : "border-b px-5 border-gray-200 py-6 cursor-pointer"
                }`}
              >
                Swift Support
              </h2>
              <h2
                onClick={() => setTitle("personal")}
                className={`${
                  title === "personal"
                    ? "text-orange-400 px-5 border-b py-6 cursor-pointer"
                    : "border-b px-5 border-gray-200 py-6 cursor-pointer"
                }`}
              >
                Personal Connections
              </h2>
              <h2
                onClick={() => setTitle("seasoned")}
                className={`${
                  title === "seasoned"
                    ? "text-orange-400 px-5 border-b py-6 cursor-pointer"
                    : "border-b px-5 border-gray-200 py-6 cursor-pointer"
                }`}
              >
                Seasoned Professionals
              </h2>
              <h2
                onClick={() => setTitle("multilingual")}
                className={`${
                  title === "multilingual"
                    ? "text-orange-400 px-5 border-b py-6 cursor-pointer"
                    : "border-b px-5 border-gray-200 py-6 cursor-pointer"
                }`}
              >
                Multilingual Support
              </h2>
              <div className="flex items-center cursor-pointer gap-4 py-4 px-5 bg-orange-500 rounded-xl text-gray-100 ">
                <span className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                  <IoIosMail className="text-orange-500 text-2xl" />
                </span>
                <h2>Contact Us</h2>
              </div>
            </div>
            <div className="lg:mt-[-500px] lg:ml-[150px] lg:text-gray-600">
              {title === "flex" && (
                <div className="absolute mt-[550px] py-5 px-5 lg:px-0 text-white lg:text-black ">
                  <h2 className="text-3xl font-bold pb-5">
                    FlexChange Support
                  </h2>
                  <p className="pb-5 lg:text-[1.1rem] lg:w-[430px]">
                    Experience Ultimate Flexibility: Dissatisfied with your
                    support worker, caregiver, or therapist? A quick phone call
                    is all it takes to bring about a change. We prioritise your
                    comfort and empower you to shape your support team according
                    to your preferences.
                  </p>
                  <div className="flex gap-3 items-center text-white cursor-pointer hover:text-orange-400 border border-orange-500 py-2 px-5 w-[180px] justify-center">
                    <p>Get Started</p>
                    <MdArrowRightAlt />
                  </div>
                </div>
              )}

              {title === "priority" && (
                <div className="absolute mt-[550px] py-5 px-5 lg:px-0 text-white lg:text-black ">
                  <h2 className="text-3xl font-bold pb-5">
                    Priority-Centric Care
                  </h2>
                  <p className="pb-5 lg:text-[1.1rem] lg:w-[430px]">
                    Beyond Listening, Truly Attentive: At PathwayCare Solutions,
                    your priorities take center stage. Our services are not just
                    personalised; they&aspos;re customised to align seamlessly
                    with your individual goals and needs. Your well-being is our
                    ultimate priority.
                  </p>
                  <div className="flex gap-3 items-center text-white cursor-pointer hover:text-orange-400 border border-orange-500 py-2 px-5 w-[180px] justify-center">
                    <p>Get Started</p>
                    <MdArrowRightAlt />
                  </div>
                </div>
              )}

              {title === "swift" && (
                <div className="absolute mt-[550px] py-5 px-5 lg:px-0 text-white lg:text-black ">
                  <h2 className="text-3xl font-bold pb-5">Swift Support</h2>
                  <p className="pb-5 lg:text-[1.1rem] lg:w-[430px]">
                    Prompt Assistance, No Waiting Game: Seeking help? Reach out,
                    and experience swift responsiveness. No prolonged waiting or
                    being overlooked. Our immediate response ensures your needs
                    are addressed promptly and efficiently.
                  </p>
                  <div className="flex gap-3 items-center text-white cursor-pointer hover:text-orange-400 border border-orange-500 py-2 px-5 w-[180px] justify-center">
                    <p>Get Started</p>
                    <MdArrowRightAlt />
                  </div>
                </div>
              )}

              {title === "personal" && (
                <div className="absolute mt-[550px] py-5 px-5 lg:px-0 text-white lg:text-black ">
                  <h2 className="text-3xl font-bold pb-5">
                    Personal Connections
                  </h2>
                  <p className="pb-5 lg:text-[1.1rem] lg:w-[430px]">
                    More Than Statistics, Personal Relationships: At PathwayCare
                    Solutions, we focus on personal connections. You are more
                    than just a number; you are a unique individual. Our
                    individualised approach ensures you receive care tailored to
                    your distinctive needs.
                  </p>
                  <div className="flex gap-3 items-center text-white cursor-pointer hover:text-orange-400 border border-orange-500 py-2 px-5 w-[180px] justify-center">
                    <p>Get Started</p>
                    <MdArrowRightAlt />
                  </div>
                </div>
              )}

              {title === "seasoned" && (
                <div className="absolute mt-[550px] py-5 px-5 lg:px-0 text-white lg:text-black ">
                  <h2 className="text-3xl font-bold pb-5">
                    Seasoned Proffesionals
                  </h2>
                  <p className="pb-5 lg:text-[1.1rem] lg:w-[430px]">
                    More Than Statistics, Personal Relationships: At PathwayCare
                    Solutions, we focus on personal connections. You are more
                    than just a number; you are a unique individual. Our
                    individualised approach ensures you receive care tailored to
                    your distinctive needs.
                  </p>
                  <div className="flex gap-3 items-center text-white cursor-pointer hover:text-orange-400 border border-orange-500 py-2 px-5 w-[180px] justify-center">
                    <p>Get Started</p>
                    <MdArrowRightAlt />
                  </div>
                </div>
              )}

              {title === "multilingual" && (
                <div className="absolute mt-[550px] py-5 px-5 lg:px-0 text-white lg:text-black ">
                  <h2 className="text-3xl font-bold pb-5">
                    Multilingual Support
                  </h2>
                  <p className="pb-5 lg:text-[1.1rem] lg:w-[430px]">
                    Culturally Inclusive Assistance: Our diverse and
                    multilingual team caters to Culturally and Linguistically
                    Diverse (CALD) communities in Australia. Speak another
                    language? Our inclusive support ensures you receive care and
                    understanding tailored to your linguistic preferences.
                  </p>
                  <div className="flex gap-3 items-center text-white cursor-pointer hover:text-orange-400 border border-orange-500 py-2 px-5 w-[180px] justify-center">
                    <p>Get Started</p>
                    <MdArrowRightAlt />
                  </div>
                </div>
              )}
            </div>
            <div className=" z-[-1] h-[950px] lg:h-[600px] lg:w-[850px] lg:right-[-160px] absolute top-0 w-full rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-5 border border-orange-300 "></div>
          </div>
        </div>
      </span>
    </div>
  );
}

export default Why;