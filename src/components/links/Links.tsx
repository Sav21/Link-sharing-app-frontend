import EmptyForm from "./EmptyForm";
import dragAndDrop from "../../images/icon-drag-and-drop.svg";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { userLinks } from "../../service/userService";
import Select from "react-select";
import { platforms } from "../../constants";
import { UserLink, phoneDisplayDataAtom } from "../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetAtom } from "jotai";

const options = platforms.map((platform) => ({
  value: platform.id,
  label: platform.displayName,
}));

const Links = () => {

  const setPhoneDisplayData = useSetAtom(phoneDisplayDataAtom);
  const queryClient = useQueryClient();

  const updateUserLinksMutation = useMutation({
    mutationFn: userLinks,
    onSuccess: () => queryClient.invalidateQueries()
  });

  const { register, handleSubmit, control, watch } = useForm<{
    links: UserLink[];
  }>({
    defaultValues: {
      links: [],
    },
  });
  const onSubmit = handleSubmit((data) => {
    updateUserLinksMutation.mutate(data.links);
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  useEffect(() => {
    const { unsubscribe } = watch((data) => {
      // @ts-expect-error brt
      setPhoneDisplayData({ links: data.links });
    });

    return () => unsubscribe();
  }, [watch, setPhoneDisplayData]);

  return (
    <div className="bg-white xl:w-[950px] sm:w-[760px] xs:w-[380px] xl:h-[800px] sm:h-[874px] xs:h-[800px] rounded-xl mt-6  overflow-y-auto scrollbar-hide">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <h1 className="text-gray-800 xl:text-4xl sm:text-4xl xs:text-2xl font-bold self-start mt-10 ml-8 ">
          Customize your links
        </h1>
        <p className=" mt-4 text-gray-500 self-start ml-8 xl:w-[600px] sm:w-[600px] xs:w-[300px]">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          type="button"
          className="mt-10 xl:w-[880px] sm:w-[700px] xs:w-[300px] border-purp bg-white text-purp mb-6 hover:bg-light-purp"
          onClick={() => {
            append({
              id: String(Math.random()),
              platform: "github",
              value: "",
            });
          }}
        >
          + Add new link
        </button>
         
        {fields.length === 0 && <EmptyForm />}
       
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="bg-light-gray xl:w-[880px] sm:w-[700px] xs:w-[300px] p-4 mb-4 rounded-xl">
              <div className="flex flex-row justify-between items-center ">
                <p className="flex flex-row items-center text-gray-900">
                  <img src={dragAndDrop} alt="" className="mr-2" /> Link
                </p>
                <button
                  className="bg-light-gray text-gray-900"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Remove
                </button>
              </div>
              <div>
                <div>
                  <p className="text-sm text-gray-900">Platform</p>
                  <Controller
                    name={`links.${index}.platform`}
                    control={control}
                    render={({ field }) => {
                      const platformValue =
                        options.find(
                          (option) => option.value === field.value
                        ) ?? null;

                      return (
                        <Select
                          {...field}
                          value={platformValue}
                          onChange={(option) => {
                            if (!option) {
                              return;
                            }
                            field.onChange(option.value);
                          }}
                          options={options}
                          unstyled
                          classNames={{
                            control: () =>
                              "bg-white xl:w-[845px] sm:w-[665px] xs:w-[265px] p-2 rounded-lg bg-white mt-1 border border-gray-300 focus-within:border-purp text-gray-900",
                            option: () =>
                              "bg-white xl:w-[845px] sm:w-[665px] xs:w-[265px] p-3  bg-white text-gray-800 focus:text-purp text-gray-900",
                          }}
                        />
                      );
                    }}
                  ></Controller>
                  <p className="text-sm mt-2 text-gray-900">Link</p>
                  <input
                    type="text"
                    placeholder="e.g. http://www.github.com/johnappleseed"
                    className="bg-white xl:w-[845px] sm:w-[665px] xs:w-[265px] p-2 rounded-lg  outline-none mt-1 text-gray-800 border focus-within:border-purp "
                    {...register(`links.${index}.value`)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <hr className="mt-5 self-stretch" />
        <button
          type="submit"
          className="bg-purp xl:w-[100px] sm:w-[100px] xs:w-[350px] mt-5 mb-5 xl:mr-9 sm:mr-9 xs:mr-0 xl:self-end sm:self-end xs:self-center text-white hover:bg-hover-purp border-none"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Links;
