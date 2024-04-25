import { Link } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import SearchComponent from "../../component/SearchComponent";
import TableComponent from "../../component/TableComponent";
import Layout from "../../layout";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  deleteAccount,
  getAccountById,
  getAllAccount,
  updateAccount,
} from "../../../thunks/AccountsThunk";
import { debounce } from "../../../app/debounce";
import { Pagination, Stack } from "@mui/material";
import EditAccountModal from "../../modal/account/EditAccountModal";
import moment from "moment";

function ManagerAccount() {
  const { allAccount, singleAccount, paginationAccount } = useSelector(
    (state) => state.accountsReducer
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(paginationAccount?.number + 1);

  useLayoutEffect(() => {
    if (allAccount.length <= 0) {
      dispatch(getAllAccount());
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(getAllAccount(0));
  }, []);

  const [showRoleById, setShowRoleById] = useState(false);
  const [showEditAccount, setEditAccount] = useState(false);
  const [searchData, setSearchData] = useState(allAccount);
  const [search, setSearch] = useState("");
  const handleGetAccountById = (item) => {
    setShowRoleById(!showRoleById);
    dispatch(getAccountById(item));
  };
  const handleShowEditAccount = (item) => {
    
    dispatch(getAccountById(item)).then((reps) => {
      if (!reps.error) {
        setEditAccount(!showEditAccount);
      }
    });
    
  };

  const handleSearchContact = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const newSearch = allAccount?.filter((item) =>
      item?.username?.toLowerCase().includes(search?.toLowerCase())
    );
    if (newSearch?.length !== 0) {
      setSearchData(newSearch);
    } else {
      setSearchData(allAccount);
    }
  }, [search, allAccount]);

  useEffect(() => {
    setCurrentPage(paginationAccount?.number + 1);
  }, [allAccount]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllAccount(pageNumber - 1));
  };
  const handleChangeActive = (item) => {
    dispatch(updateAccount({ id: item, data: { active: true } }));
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="title pt-3">
          <span className="text-xl font-bold uppercase">
            Danh sách tài khoản
          </span>
        </div>
        <div className="flex justify-between">
          <SearchComponent
            placeholder="Nhập tên đăng nhập"
            style={"w-2/6"}
            handleSearch={debounce(handleSearchContact, 1000)}
          />

          <Link
            to="/them-tai-khoan"
            className="text-white bg-blue-700 hover:bg-blue-800 my-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  "
          >
            Thêm tài khoản
          </Link>
        </div>
        <div className="table-manager">
          <TableComponent
            headTable={[
              "id",
              "fullName",
              "username",
              "số điện thoại",
              "phòng ban",
              "hành động",
            ]}
          >
            {searchData?.map((item, key) => (
              <tr
                className={`${item.active ? "hover:bg-gray-100" : ""}`}
                key={key}
              >
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {key + 1}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.user?.fullName || "Chưa có dữ liệu"}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.username || "Chưa có dữ liệu"}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.user?.phone || "Chưa có dữ liệu"}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.user?.department || "Chưa có dữ liệu"}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  {/* <ButtonComponent
                type="button"
                id="updateaccountButton"
                className="bg-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                
                Chỉnh sửa
              </ButtonComponent> */}
                  {item.active === true ? (
                    <>
                      <ButtonComponent
                        type={"button"}
                        textButton={"Chỉnh sửa"}
                        handleClick={()=>handleShowEditAccount(item?.id)}
                      />
                      <ButtonComponent
                        type={"button"}
                        textButton={"Chi tiết"}
                        handleClick={() => handleGetAccountById(item?.id)}
                      />
                      <ButtonComponent
                        type={"button"}
                        textButton={"Vô hiệu hóa"}
                        typeButton={2}
                        handleClick={() => {
                          if (
                            window.confirm(
                              "Bạn có muốn vô hiệu hóa tài khoản này không này không?"
                            )
                          ) {
                            dispatch(deleteAccount(item.id));
                          }
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <ButtonComponent
                        type={"button"}
                        textButton={"Tài khoản đã bị vô hiệu hóa"}
                        style={"text-white bg-red-300  mx-1.5 cursor-default"}
                      />
                      <ButtonComponent
                        type={"button"}
                        textButton={"Duyệt tài khoản"}
                        handleClick={() => handleChangeActive(item?.id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </TableComponent>
        </div>
      </div>
      <div
        className={`fixed mx-auto ${
          showRoleById ? "block" : "hidden"
        } left-0 right-0 z-50 items-center justify-center  overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="edit-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl px-4 md:h-auto m-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold ">Thông tin chi tiết</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="edit-user-modal"
                onClick={() => setShowRoleById(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      UserName
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      value={singleAccount?.username}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      fullName
                    </label>
                    <span
                      name="phone"
                      id="phone"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {singleAccount?.user?.fullName ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      phone
                    </label>
                    <span
                      name="phone"
                      id="phone"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {singleAccount?.user?.phone ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="birthday"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      birthday
                    </label>
                    <span
                      name="phone"
                      id="phone"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      
                      {moment(singleAccount?.user?.birthday).format(
                                    "DD-MM-YYYY"
                                  ) ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showEditAccount && <EditAccountModal setEditAccount={setEditAccount} />}
      {paginationAccount?.totalPages > 1 && (
    <Stack
    spacing={2}
    justifyContent="center"
    color="#fff"
    className="pagination"
  >
    <Pagination
      count={paginationAccount?.totalPages}
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

export default ManagerAccount;
