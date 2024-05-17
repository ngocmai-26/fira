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
import { Pagination, Stack } from "@mui/material";

function ManagerTimeKeep() {
  const { allTimeKeep, paginationTimeKeep } = useSelector((state) => state.timeKeepsReducer);
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
  const [currentPage, setCurrentPage] = useState(paginationTimeKeep?.number + 1);

  useEffect(() => {
    setCurrentPage(paginationTimeKeep?.number + 1);
  }, [allTimeKeep]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllTimeKeep(pageNumber - 1));
  };

  
  return (
    <Layout>
      <div className="p-4 px-10">
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
                    {key +1}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                {item?.userChecked?.fullName}
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
                    textButton={"Chi tiết"}
                    style={"text-white bg-[#58AD69]"}
                    // handleClick={() => handleHiddenUpdate(item)}
                  />
                </td>
              </tr>
            ))}{" "}
          </TableComponent>
        </div>
      </div>
      {paginationTimeKeep?.totalPages > 1 && (
          <Stack
            spacing={2}
            justifyContent="center"
            color="#fff"
            className="pagination"
          >
            <Pagination
              count={paginationTimeKeep?.totalPages}
              color="primary"
              className="pagination-item"
              style={{ margin: "auto" }}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        )}
    </Layout>
  );
}

export default ManagerTimeKeep;
