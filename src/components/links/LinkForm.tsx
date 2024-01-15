import dragAndDrop from "../../images/icon-drag-and-drop.svg";
import Select from "react-select";
import { platforms } from "../../constants";
import { useFieldArray, useForm } from "react-hook-form";
import { userLinks } from "../../service/userService";

const options = platforms.map((platform) => ({
  value: platform.id,
  label: platform.displayName,
}));

export type LinkFormProps = {
  removeUserLink: () => void;
  platform: string;
  value: string;
  setPlatform: (platform: string) => void;
  setValue: (value: string) => void;
};

const LinkForm = ({
  removeUserLink,
  platform,
  value,
  setPlatform,
  setValue,
}: LinkFormProps) => {
  const platformValue =
    options.find((option) => option.value === platform) ?? null;
  const error = false;

  const { register, handleSubmit, control } = useForm();
  const onSubmit = handleSubmit((data) => {
    userLinks(data.platform, data.value).then(({ data }) => {
      localStorage.setItem("userLinks", JSON.stringify(data.user));
    });
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <div className="bg-light-gray xl:w-[880px] sm:w-[700px] xs:w-[300px] p-4 mb-7 rounded-xl">
      <div className="flex flex-row justify-between items-center ">
        <p className="flex flex-row items-center text-gray-900">
          <img src={dragAndDrop} alt="" className="mr-2" /> Link
        </p>
        <button
          className="bg-light-gray text-gray-900"
          onClick={removeUserLink}
        >
          Remove
        </button>
      </div>
      <div>
        <form action="me/links" onSubmit={onSubmit} id="linkForm">
          <p className="text-sm text-gray-900">Platform</p>
          <Select
            options={options}
            unstyled
            classNames={{
              control: () =>
                "bg-white xl:w-[845px] sm:w-[665px] xs:w-[265px] p-2 rounded-lg bg-white mt-1 border border-gray-300 focus-within:border-purp text-gray-900",
              option: () =>
                "bg-white xl:w-[845px] sm:w-[665px] xs:w-[265px] p-3  bg-white text-gray-800 focus:text-purp text-gray-900",
            }}
            onChange={(option) => {
              if (!option) {
                return;
              }
              setPlatform(option.value);
              setValue("");
            }}
            value={platformValue}
            name="platform"
            // {...register("platform")}
          />
          <p className="text-sm mt-2 text-gray-900">Link</p>
          <input
            type="text"
            // name="link"
            placeholder="e.g. http://www.github.com/johnappleseed"
            className={`bg-white xl:w-[845px] sm:w-[665px] xs:w-[265px] p-2 rounded-lg  outline-none mt-1 text-gray-800 border focus-within:border-purp ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            // onChange={(event) => setValue(event.target.value)}
            // value={value}
            {...register("link")}
          />
        </form>
      </div>
    </div>
  );
};

export default LinkForm;
