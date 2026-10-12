import "./Logo.css";

function Logo() {
  return (
    <div className="logo-container">
      <svg
        viewBox="0 0 500 100"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <text
          x="30"
          y="95"
          className="text-stroke text-black dark:text-white"
        >
          Mixel.uz
        </text>
      </svg>
    </div>
  );
}

export default Logo;

