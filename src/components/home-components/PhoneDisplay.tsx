import { useAtomValue } from "jotai";
import { userDetailsAtom } from "../../store";
import { platforms } from "../../constants";
import arrow from "../../images/icon-arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../shared/api";

const PhoneDisplay = () => {
  const userDetails = useAtomValue(userDetailsAtom);

  const getUserDetails = async () => {
    const res = await API.get("me/details");
    return res.data;
  };

  const getUserLinks = async () => {
    const res = await API.get("me/links");
    return res.data.links;
  }
  const { data, isSuccess } = useQuery({
    queryKey: ["random"],
    queryFn: async () => {
      const [links, details] = await Promise.all([getUserLinks(), getUserDetails()]);
      return { links, details };
    }
  });



  const linksList = (data?.links ?? []).map((link) => {
    const platform = platforms.find(
      (platform) => platform.id === link.platform
    );
    if (!platform) {
      return null;
    }
    return (
      <div
        key={link.id}
        className="w-60 h-12 mt-5 rounded-md bg-gray-200 text-white flex-shrink-0 flex flex-row justify-between"
        style={{ backgroundColor: platform.primaryColor }}
      >
        <div className="flex flex-row">
          <img
            src={platform.icon}
            alt=""
            className="h-5 self-center mr-2 ml-3"
          />
          <p className="mt-3">{platform.displayName}</p>
        </div>
        <img src={arrow} alt="" className="h-5 self-center mr-5" />
      </div>
    );
  });


  return (
    <div className="relative xl:w-[308px] sm:w-[0px] xs:w-[0px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="308"
        height="632"
        fill="none"
        viewBox="0 0 308 632"
        className="xl:w-[308px] sm:w-0 xs:w-0"
      >
        <path
          stroke="#737373"
          d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
        />
        <path
          fill="#fff"
          stroke="#737373"
          d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
        />
        <circle cx="153.5" cy="112" r="48" fill="#EEE" />
        <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
        <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
        <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
        <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
        <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
        <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
        <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
      </svg>

      <div className="flex flex-col items-center absolute inset-0 mx-8 my-12 bg-white overflow-y-auto scrollbar-hide">
        {userDetails.image.length === 0 ? (
          <div className="w-28 h-28 mt-5 rounded-full bg-gray-200 flex-shrink-0" />
        ) : (
          <img
            src={userDetails.image}
            alt=""
            className="h-28 rounded-full mt-5"
          />
        )}
        {!isSuccess && (
          <div className="w-[72px] h-2 mt-3 rounded-lg mb-10 bg-gray-200 flex justify-center items-center flex-shrink-0" />
        )}
        {isSuccess && (
          <p className="mt-5 text-gray-900 text-xl">
            {data.details.firstName + " " + data.details.lastName}
          </p>
        )}
        {!isSuccess && (
          <div className="w-[72px] h-2 mt-3 rounded-lg mb-10 bg-gray-200 flex justify-center items-center flex-shrink-0" />
        )}
        {isSuccess && (
          <p className="mt-3 mb-10 text-gray-500 text-lg">{data.details.email}</p>
        )}

        {linksList.length > 0 && linksList}
        {linksList.length === 0 && (
          <div>
            <div className="w-60 h-11 mt-4 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-4 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-4 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-4 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-4 rounded-md bg-gray-200 text-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneDisplay;
