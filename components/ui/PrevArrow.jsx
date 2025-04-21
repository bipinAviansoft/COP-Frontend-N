function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} before:!hidden !w-[30px] md:!w-[40px] !h-[30px] md:!h-[40px] !bg-white !rounded-[100%] z-[2] text-center !left-[-10px] md:!left-[-20px]`}
      onClick={onClick}
      style={{ ...style, border: "1px solid #808080", display: "block" }}
    >
      <svg
        className="mx-auto w-[5px] md:w-[8px]"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13L1 7L7 1"
          stroke="#565F64"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default PrevArrow;
