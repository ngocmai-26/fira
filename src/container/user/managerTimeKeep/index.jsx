import { Link } from "react-router-dom";
import { debounce } from "../../../app/debounce";
import {
  Checkout,
  checkout,
  getAllTimeKeep,
  getUserManagerTimeKeep,
  getUserTimeKeep,
  newCheckIn,
} from "../../../thunks/TimeKeepsThunk";
import ButtonComponent from "../../component/ButtonComponent";
import SearchComponent from "../../component/SearchComponent";
import { Spinner } from "../../component/Spinner";
import TableComponent from "../../component/TableComponent";
import Layout from "../../layout";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function ManagerTimeKeep() {
  const { allTimeKeep } = useSelector((state) => state.timeKeepsReducer);
  const { user, account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [check, setCheck] = useState(1);

  useLayoutEffect(() => {
    if (allTimeKeep?.length <= 0) {
      if (account.role.roleName === "ROLE_ADMIN") {
        dispatch(getAllTimeKeep());
      } else if (account.role.roleName === "ROLE_MANAGER") {
        setCheck(1)
      } else {
        dispatch(getUserTimeKeep({ id: user?.id, data: 0 }));
      }
    }
  }, []);
  useLayoutEffect(() => {
    if (account.role.roleName === "ROLE_ADMIN") {
      dispatch(getAllTimeKeep());
    } else if (account.role.roleName === "ROLE_MANAGER") {
      setCheck(1)
    } else {
      dispatch(getUserTimeKeep({ id: user?.id, data: 0 }));
    }
  }, []);


  useEffect(() => {
    if (account.role.roleName === "ROLE_MANAGER") {
      if (check === 1) {
        dispatch(getUserManagerTimeKeep({ id: user?.id, data: 0 }));
      } else {
        dispatch(getUserTimeKeep({ id: user?.id, data: 0 }));
      }
    }
    
  }, [check])

  const handleSearchContact = (e) => {
    // dispatch(searchPermissionAsync(e.target.value));
  };
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 6) {
      console.log("Checkin sẽ mở lúc 6h");
    } else if (hours < 12) {
      console.log("Checkin sẽ mở lúc 12h");
    } else if (hours < 15) {
      console.log("Checkin sẽ mở lúc 16h");
    } else {
      console.log("Checkin đã đóng");
    }

    if (hours >= 6 && hours < 7) {
      setDisabled(false);
    } else if (hours >= 12 && hours < 13) {
      setDisabled(false);
    } else if (hours >= 15 && hours < 16) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  const handleCheckin = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 7) {
      dispatch(newCheckIn({ userId: account?.user?.id, shift: "MORNING" }));
      console.log("MORNING");
    } else if (hours < 13) {
      dispatch(newCheckIn({ userId: account?.user?.id, shift: "AFTERNOON" }));
      console.log("AFTERNOON");
    } else if (hours < 16) {
      dispatch(newCheckIn({ userId: account?.user?.id, shift: "NIGHT" }));
      console.log("NIGHT");
    } else {
      console.log("Checkin đã đóng");
    }

    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 3600000); // 1 giờ
  };
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 13) {
      dispatch(Checkout({ userId: account?.user?.id, shift: "MORNING" }));
    } else if (hour < 17) {
      dispatch(Checkout({ userId: account?.user?.id, shift: "AFTERNOON" }));
    } else if (hour < 24) {
      dispatch(Checkout({ userId: account?.user?.id, shift: "EVENING" }));
    } else {
      console.log("Quá giờ checkout");
    }

    setIsCheckedOut(true);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="title pt-3 pb-4 flex justify-between">
          <span className="text-xl font-bold uppercase">
            Danh sách điểm danh
          </span>
          {account?.role?.roleName === "ROLE_MANAGER" && (
            <div>
              <button className={`btn ${check === 1 ?  'bg-blue-500': 'bg-slate-400'}  px-4 py-1 text-sm text-white mx-2`} onClick={() => setCheck(1)}>
                Quản lý
              </button>
              <button className={`btn ${check !== 1 ?  'bg-blue-500': 'bg-slate-400'}  px-4 py-1 text-sm text-white `} onClick={() => setCheck(2)}>
                Cá nhân
              </button>
            </div>
          )}
        </div>

        <div className="table-manager">
          <TableComponent
            headTable={[
              "id",
              "Tên người dùng",
              "Giờ Checkin",
              "Trạng thái",
              "Ca",
              "",
            ]}
          >
            {allTimeKeep?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {item?.id}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  <button
                    className="w-full"
                    // onClick={() => handleGetPermissionById(item?.id)}
                  >
                    {item?.userChecked?.fullName}
                  </button>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {moment(item?.checkInTime).format("HH:mm")}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.status}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.shift}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <ButtonComponent
                    type={"button"}
                    textButton={"Chỉnh sửa"}
                    // handleClick={() => handleHiddenUpdate(item)}
                  />
                </td>
              </tr>
            ))}{" "}
          </TableComponent>
        </div>
      </div>
    </Layout>
  );
}

export default ManagerTimeKeep;
