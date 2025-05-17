'use client';
import { SiGoogletasks } from "react-icons/si";


export default function Header() {
  return (
    <div className="flex items-center bg-white shadow-md top-0 fixed w-full z-50 h-16 px-4 sm:px-8">
      {/* Logo and Name */}
      <div 
        className="flex items-center text-2xl lg:text-4xl font-bold italic "
      >
        {/* <SlSocialTumblr className="text-4xl text-sky-600" /> */}
        <span className="hidden sm:flex ">
          <p className="bg-gradient-to-r flex from-sky-500 to-blue-600 text-transparent bg-clip-text">
            TaskL
          </p>
          <SiGoogletasks className="hidden sm:inline self-end text-2xl text-blue-600" />
          <SiGoogletasks className="hidden sm:inline self-end text-2xl text-blue-700" />
          <p className="bg-gradient-to-r flex from-blue-700 to-blue-800 text-transparent bg-clip-text">
            p
          </p>
        </span>
      </div>
    </div>
  );
}
