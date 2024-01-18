import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchComponent({placeholder, styleRadius, handleSearch, style}) {
    return ( 
        <div className={`search py-2 ${style}`}>
            <div className={`border w-full flex justify-between p-1 ${styleRadius? styleRadius: "rounded-md"} `} >
              <FontAwesomeIcon
                icon={faSearch}
                className="font-thin p-1.5 text-gray-300"
              />
              <input
                type="text"
                className=" w-full focus-visible:border-0 focus-visible:outline-0 text-sm"
                placeholder={placeholder}
              ></input>
            </div>
          </div>
     );
}

export default SearchComponent;