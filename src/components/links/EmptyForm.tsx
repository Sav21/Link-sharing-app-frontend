import picture from "../../images/illustration-empty.svg";

const EmptyForm = () => {
  return (
    <div className="flex flex-col items-center self-center bg-light-gray xl:w-[880px] sm:w-[700px] xs:w-[300px] p-4  rounded-xl mb-2">
      <img
        src={picture}
        alt=""
        className="h-54 mt-14 xl:w-[240px] sm:w-[240px] xs:w-[150px]"
      />
      <h1 className="text-gray-800 mt-6 xl:text-4xl sm:text-4xl xs:text-2xl font-bold">
        Let's get you started
      </h1>
      <p className="text-gray-800 text-sm xl:w-[500px] sm:w-[500px] xs:w-[200px] text-center mt-5 mb-16">
        Use the "Add new link" button to get started. Once you have more than
        one link, you can reorder and edit them. We're here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
};

export default EmptyForm;