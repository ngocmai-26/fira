import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminSideNavItem = ({ item, isActive }) => {
  return (
    <div className="navItem">
      <Link
        to={item?.to || ""}
        className={`flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md ${isActive ? 'bg-gray-100 text-primary-700' : 'hover:bg-gray-100'}`}
      >
        <FontAwesomeIcon icon={item?.icon} />
        <span className="ml-2 text-sm nav-item-text truncate">
          {item?.title}
        </span>
      </Link>
    </div>
  );
};
