import { useAtomValue } from "jotai";
import { userDetailsAtom, userLinksAtom } from "../store";
import { platforms } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { API } from "../shared/api";

const PreviewDisplay = () => {
  const userDetails = useAtomValue(userDetailsAtom);
  const userLinks = useAtomValue(userLinksAtom);

  const getUserDetails = async () => {
    const res = await API.get("me/details");
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["random"],
    queryFn: getUserDetails,
  });

  if (isLoading) {
    return null;
  }

  const linksList = userLinks.map((link) => {
    const platform = platforms.find(
      (platform) => platform.id === link.platform
    );
    if (!platform) {
      return null;
    }
    return (
      <div
        key={link.id}
        className="w-60 h-12 mt-5 rounded-md bg-gray-200 text-white flex-shrink-0 flex flex-row"
        style={{ backgroundColor: platform.primaryColor }}
      >
        <img
          src={platform.icon}
          alt=""
          className="h-5 self-center mr-2 ml-3 fill-inherit"
        />
        <p className="mt-3">{platform.displayName}</p>
      </div>
    );
  });

  return (
    <div className="lg:bg-light-gray sm:bg-light-gray xs:bg-white lg:h-screen sm:h-screen xs:h-screen flex flex-col">
      <div className="xs:bg-white sm:bg-purp lg:bg-purp h-[350px] rounded-b-3xl">
        <div className="pb-5" />
        <div className="flex  justify-center">
          <div className=" bg-white p-5 rounded-xl sm:w-[700px] lg:w-[1800px] xs:w-[400px] pl-10 flex justify-between">
            <a href="/">
              <button className="bg-white border-purp text-purp focus:bg-light-purp  focus:text-purp">
                Back to Editor
              </button>
            </a>
            <button className="border-purp bg-purp outline-purp text-white w-[130px]">
              Share Links
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col  self-center items-center bg-white w-[350px] h-[550px] -mt-[150px] lg:shadow-md md:shadow-lg xs:shadow-none rounded-2xl overflow-y-auto scrollbar-hide">
        {userDetails.image.length === 0 ? (
          <div className="w-24 h-24 mt-10 rounded-full bg-gray-200 flex-shrink-0" />
        ) : (
          <img
            src={userDetails.image}
            alt=""
            className="h-32 rounded-full mt-10"
          />
        )}
        {isLoading && (
          <div className="w-[72px] h-2 mt-3 rounded-lg mb-10 bg-gray-200 flex justify-center items-center flex-shrink-0" />
        )}
        {!isLoading && (
          <p className="mt-5 text-gray-900 text-xl">
            {data.firstName + " " + data.lastName}
          </p>
        )}
        {isLoading && (
          <div className="w-[72px] h-2 mt-3 rounded-lg mb-10 bg-gray-200 flex justify-center items-center flex-shrink-0" />
        )}
        {!isLoading && (
          <p className="mt-3 mb-10 text-gray-500 text-lg">{data.email}</p>
        )}

        {linksList.length > 0 && linksList}
        {linksList.length === 0 && (
          <div>
            <div className="w-60 h-11 mt-5 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-5 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-5 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-5 rounded-md bg-gray-200 text-white"></div>
            <div className="w-60 h-11 mt-5 rounded-md bg-gray-200 text-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewDisplay;
