const Button = ({
  bg = "black",
  color = "white",
  w = "",
  onClick = () => {},
  text = "Shop Now",
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`w-${w} py-4  px-12 text-xl`}
      style={{
        background: ` ${bg}`,
        color: `${color}`,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
