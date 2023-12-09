import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Section = ({ title, child }) => {
  return (
    <div className="w-full">
      <div
        className="w-full flex justify-between pt-2 pb-3 mb-4 mt-12"
        style={{ borderBottom: "1px solid #ddd" }}
      >
        <h2 className="text-xl">{title}</h2>
        <div className="flex gap-2">
          {" "}
          <button className="section-btn w-8 h-8 flex justify-center items-center text-black">
            <IoIosArrowBack />
          </button>
          <button className="section-btn w-8 h-8 flex justify-center items-center text-black">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      {child}
    </div>
  );
};

export default Section;
