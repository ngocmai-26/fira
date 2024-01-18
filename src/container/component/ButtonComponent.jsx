import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonComponent({ textButton, handleClick, icon, style, type, iconStyles }) {
  const isFunction = typeof handleClick === 'function';
  return (
    <button
      type={type || "button"}
      onClick={isFunction ? handleClick : () => {}}
      className={`${
        style || " bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 mx-1 mr-1"
      }font-medium rounded-md text-sm  px-5 py-2 text-white `}
    >
      <FontAwesomeIcon icon={icon} className={iconStyles}  />
      {textButton}
    </button>
  );
}

export default ButtonComponent;
