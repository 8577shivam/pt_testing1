// Components/HomePage.tsx
import React from 'react';
import Arrow from "../Assets/arrow.svg";

interface HomePageProps {
  handleStart: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ handleStart }) => {
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      <div className="bg-[#1f1f1f] min-h-[500px] rounded-xl p-10">
        <div className="h-full flex justify-center items-center">
          <div className="h-full flex flex-col justify-center w-fit">
            <p className="mb-10 text-lg">Start Building</p>
            <div className="flex items-center gap-4">
              <button className="h-[48px] border border-[rgba(255,255,255,0.12)] px-3 py-2 rounded-lg">Cancel</button>
              <button className="h-[48px] flex items-center gap-4 bg-gradient-to-r from-[#986EEB] via-[#FD68B3] to-[#FDB786] text-white border-none text-base font-bold px-[20px] py-2 rounded-lg ease-in-out duration-300 hover:opacity-80" onClick={handleStart}>
                Start
                <img src={Arrow} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1f1f1f] min-h-[500px] rounded-xl p-10 hidden md:block">
        <p className="text-lg">Building your profile</p>
      </div>
    </div>
  );
};

export default HomePage;
