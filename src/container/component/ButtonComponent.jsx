import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonComponent({ textButton, handleSubmit, icon, style, type, iconStyles }) {
    console.log(handleSubmit)
  return (
    <button
      type={type || "button"}
      onClick={handleSubmit}
      className={`font-medium rounded-md text-sm  px-5 py-2 text-white ${
        style || " bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 mx-1"
      }`}
    >
      <FontAwesomeIcon icon={icon} className={iconStyles}  />
      {textButton}
    </button>
  );
}

export default ButtonComponent;
