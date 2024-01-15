import { useState } from "react";
import Links from "./links/Links";
import PhoneDisplay from "./home-components/PhoneDisplay";
// import { matchPath } from 'react-router-dom';
import Navbar from "./Navbar";
import ProfileDetails from "./home-components/ProfileDetails";

const Home = () => {
  const [buttonPressed, setButtonPressed] = useState("Links");

  const handleClickOnNavbarButtons = (page) => {
    setButtonPressed(page);
  };

  return (
    <div>
      <div className="bg-light-gray  xl:min-h-screen sm:min-h-screen flex flex-col">
        <Navbar handleClickOnNavbarButtons={handleClickOnNavbarButtons} />

        <div>
          <div className="flex flex-srow justify-center">
            <div className="bg-white xl:w-[800px] sm:w-0 xs:w-0  rounded-xl mt-6 xl:mr-12 sm:mr-0 flex flex-row justify-center items-center">
              <PhoneDisplay />
            </div>
            {buttonPressed === "Links" && <Links />}
            {buttonPressed === "Profile" && <ProfileDetails />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
