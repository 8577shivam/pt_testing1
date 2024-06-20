import React from "react";
import LogogIcon from "../Assets/Logo.png";
import SettingIcon from "../Assets/setting.svg";

const Navbar: React.FC = () => {
  return (
    <div className="border-b border-[rgba(203,213,225,0.2)]">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between px-4 md:px-11 py-4">
          <div>
            <img src={LogogIcon} alt="logo" />
          </div>
          <div>
            <img src={SettingIcon} alt="settings" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
