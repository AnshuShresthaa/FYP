import React from "react";
import { images } from "../../../constants";

const CTA = () => {
  return (
    <>
      <svg
        className="w-full h-auto max-h-40 translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>

      <section className="relative bg-dark-hard px-5">
        <div className="container mx-auto grid grid-cols-12 justify-center py-10 md:pb-20 lg:place-items-center lg:px-10">
          <div className="col-span-12 lg:col-span-6 text-center md:text-left">
            <h2 className="text-white font-roboto font-bold text-3xl md:text-4xl md:leading-normal lg:text-left">
              Your path to mental wellness starts here; let's navigate it together.
            </h2>
            <p className="text-dark-light text-sm leading-7 mt-6 md:text-base lg:text-left">
              <span className="font-bold italic text-[#B3BAC5] md:not-italic md:font-normal md:text-dark-light">
                Explore a wealth of insights, expert guidance, and empowering resources to nurture your mental health.
              </span>{" "}
              Take the first step towards a brighter tomorrow – a journey where self-care is celebrated, self-compassion flourishes, and a community of support uplifts you.
            </p>
          </div>
          <div className="col-span-12 mb-[70px] md:block md:order-first lg:col-span-6 lg:order-last">
            <div className="w-3/4 mx-auto relative">
              <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]" />
              <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-[.06] absolute -bottom-[10%] -left-[8%]" />
              <div className="w-full rounded-xl bg-white p-3 z-[1] relative">
                <img
                  src={images.MindArcImage}
                  alt="title"
                  className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                />
                <div className="p-5 text-center md:text-left">
                  <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
                    Nurture Mental Wellness Daily
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
