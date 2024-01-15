import { useState, ChangeEventHandler } from "react";
import { useAtom } from "jotai";
import { UserDetails, userDetailsAtom } from "../../store";
import { fileToDataUrl } from "../../utils";
import { useForm } from "react-hook-form";
import { profDetails } from "../../service/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfileDetails = () => {
  const [userDetails, setUserDetails] = useAtom(userDetailsAtom);
  const [userDetailsDraft, setUserDetailsDraft] = useState(userDetails);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  const updateUseDetailsMutation = useMutation({
    mutationFn: profDetails,
    onSuccess: () => queryClient.invalidateQueries()
  });


  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const imageURL = await fileToDataUrl(file);
    setUserDetailsDraft((prevUserDetails) => ({
      ...prevUserDetails,
      image: imageURL,
    }));
  };

 
  const { register, handleSubmit } = useForm<{
    details: UserDetails;
  }>({
    defaultValues: {
      details: {
        firstName: "",
        email: "",
        lastName: "",
      },
    },
  });
  const onSubmit = handleSubmit((data) => {
    updateUseDetailsMutation.mutate(data.details);
  });


  return (
    <div className="bg-white xl:w-[950px] sm:w-[760px] xs:w-[380px] xl:h-[800px] sm:h-[874px] xs:h-[1000px] rounded-xl mt-6">
      <div className="flex flex-col items-center">
        <h1 className="text-gray-800 xl:text-4xl sm:text-4xl xs:text-3xl font-bold mt-10 ml-8 self-start">
          Profile Details
        </h1>
        <p className="ml-8 mt-4 text-gray-500 self-start">
          Add your details to create a personal touch to your profile.
        </p>
        <div className="flex xl:flex-row sm:flex-row xs:flex-col justify-between bg-light-gray xl:w-[880px] sm:w-[700px] xs:w-[320px] xl:h-[235px] sm:h-[233px] mt-10 xl:items-center sm:items-center xs:items-start p-5 rounded-xl">
          <p className="leading-tight tracking-tight text-gray-500 xl:text-sm sm:text-sm xs:text-lg xl:mb-0 sm:mb-0 xs:mb-5">
            Profile picture
          </p>
          <label className="flex flex-col items-center justify-center bg-light-purp xl:h-[210px] sm:h-[200px] xs:h-[243px] xl:w-[210px] sm:w-[210px] xs:w-[243px] xl:mr-0 sm:mr-14 rounded-xl cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {userDetailsDraft && (
              <img
                src={userDetailsDraft.image}
                alt=""
                className={`outline outline-none border border-purp-light outline-purp-line xl:h-56 xl:w-56 sm:h-60 sm:w-60 rounded-xl ${
                  userDetailsDraft.image ? "brightness-75" : "brightness-100"
                }`}
              />
            )}

            <svg
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 40 40"
              className={`-mt-5 absolute ${
                userDetailsDraft.image ? "fill-white" : "fill-purp"
              }`}
            >
              <path
                fill=""
                d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
              />
            </svg>
            <p
              className={`mt-16 font-bold absolute ${
                userDetailsDraft.image ? "text-white" : "text-purp"
              }`}
            >
              + Upload Image
            </p>
          </label>

          <p className="xl:w-[200px] sm:w-[140px] text-xs mr-5 xl:-ml-48 sm:-ml-48 xs:mt-7 leading-tight tracking-tight text-gray-500">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
        <div className="flex flex-col justify-evenly mt-10 bg-light-gray xl:w-[880px] sm:w-[700px] xs:w-[320px] xl:h-[200px] sm:h-[200px] xs:h-[250] p-3 rounded-xl">
          <form action="/me/details" onSubmit={onSubmit} id="profileDetails">
            <div className="flex xl:flex-row sm:flex-row xs:flex-col justify-evenly">
              <label className="leading-tight tracking-tight xl:mr-60 sm:mr-5 xs:mr-0 xl:mt-4 sm:mt-4 xs:mt-1 xl:mb-0 sm:mb-0 xs:mb-2 text-gray-500">
                First Name*
              </label>
              <input
                type="text"
                // name="firstName"
                className={`text-gray-900 bg-white sm:text-sm block rounded-lg xl:w-[500px] sm:w-[500px] xs:w-[290px] xl:h-[45px] sm:h-[45px] xs:h-[40px] mb-2 border outline-none focus:border-purp pl-5 ${error ? "border-red-500" : "border"}`}
                placeholder="e.g. John"
                // value={userDetailsDraft.firstName}
                // onChange={handleInputChange}
                {...register("details.firstName")}
                />
            </div>
            <div className="flex xl:flex-row sm:flex-row xs:flex-col justify-evenly">
              <label className="leading-tight tracking-tight xl:mr-60 sm:mr-5 xs:mr-0 xl:mt-4 sm:mt-4 xs:mt-1 xl:mb-0 sm:mb-0 xs:mb-2 text-gray-500">
                Last Name*
              </label>
              <input
                type="text"
                // name="lastName"
                className={`text-gray-900 bg-white sm:text-sm block rounded-lg xl:w-[500px] sm:w-[500px] xs:w-[290px] xl:h-[45px] sm:h-[45px] xs:h-[40px] mb-2 border outline-none focus:border-purp pl-5 ${error ? "border-red-500" : "border"}`}
                placeholder="e.g. Appleseed"
                // value={userDetailsDraft.lastName}
                // onChange={handleInputChange}
                {...register("details.lastName")}              
              />
            </div>
            <div className="flex xl:flex-row sm:flex-row xs:flex-col justify-evenly">
              <label className="leading-tight tracking-tight xl:mr-[286px] sm:mr-16 xs:mr-0 xl:mt-4 sm:mt-4 xs:mt-1 xl:mb-0 sm:mb-0 xs:mb-2 text-gray-500">
                Email
              </label>
              <input
                type="email"
                // name="email"
                className=" text-gray-900 bg-white sm:text-sm block rounded-lg xl:w-[500px] sm:w-[500px] xs:w-[290px] xl:h-[45px] sm:h-[45px] xs:h-[40px] mb-2 border outline-none focus:border-purp pl-5"
                placeholder="e.g. email@example.com"
                // value={userDetailsDraft.email}
                // onChange={handleInputChange}
                {...register("details.email")}
              />
            </div>
          </form>
        </div>
        <hr className="xl:mt-14 sm:mt-32 xs:mt-12 self-stretch" />
        <button
          type="submit"
          form="profileDetails"
          className="bg-purp xl:w-[100px] sm:w-[100px] xs:w-[350px] xl:mt-7 sm:mt-8 xs:mt-3 xl:mr-9 sm:mr-9 xs:mr-0 mb-5 xl:self-end sm:self-end xs:self-center text-white hover:bg-hover-purp border-none"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
