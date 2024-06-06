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
import CreateAccountModal from "../../modal/account/CreateAccountModal";
import DetailAccountModal from "../../modal/account/DetailAccountModal";
import { addStaff, getAllUsers, removeStaff } from "../../../thunks/UsersThunk";

function ManagerAccount() {
  const { allAccount, paginationAccount } = useSelector(
    (state) => state.accountsReducer
  );
  const { allUser } = useSelector((state) => state.usersReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(paginationAccount?.number + 1);
  const [isHiddenManager, setIsHiddenManager] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [managerUpdate, setManagerUpdate] = useState({});

  useLayoutEffect(() => {
    if (allAccount.length <= 0) {
      dispatch(getAllAccount());
    }
    if (allUser.length <= 0) {
      dispatch(getAllUsers());
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(getAllAccount(0));
  }, []);

  const [showRoleById, setShowRoleById] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
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

  const handleUpdateManager = () => {
    console.log("managerUpdate", managerUpdate)
    dispatch(addStaff({ managerId: managerUpdate.id, staffIds: taskList }));
  };
  const handleDeleteManager = (item) => {
    dispatch(removeStaff({ managerId: managerUpdate.id, staffIds: [item] }));
    const newTaskList = taskList.filter((e) => e !== item);
    setTaskList(newTaskList);
  };

  const handleAddTaskList = (item) => {
    if (!taskList.includes(item)) {
      setTaskList([...taskList, item]);
    }
  };

  console.log("taskList", allUser);

  return (
    <Layout>
      <div className="p-4 px-10">
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
          <div>
            <ButtonComponent
              type={"button"}
              textButton={"Thêm tài khoản"}
              handleClick={() => setShowCreateAccount(true)}
              style={
                "text-sky-500 bg-white border border-sky-500 hover:bg-[#B0E2FF] focus:ring-4 focus:ring-blue-300 px-5 "
              }
            />
          </div>
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
                  {item.active === true ? (
                    <>
                      <ButtonComponent
                        type={"button"}
                        textButton={"Chỉnh sửa"}
                        handleClick={() => handleShowEditAccount(item?.id)}
                        style={
                          "text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white"
                        }
                      />
                      <ButtonComponent
                        type={"button"}
                        textButton={"Chi tiết"}
                        style={
                          "text-[#58AD69] bg-white border border-[#58AD69] hover:bg-[#58AD69] hover:text-white"
                        }
                        handleClick={() => handleGetAccountById(item?.id)}
                      />
                      {item.role.roleName === "ROLE_MANAGER" && item?.user?.id && (
                        <ButtonComponent
                          type={"button"}
                          textButton={"Xem"}
                          style={
                            "text-[#58AD69] bg-white border border-[#58AD69] hover:bg-[#58AD69] hover:text-white"
                          }
                          handleClick={() => {
                            setIsHiddenManager(!isHiddenManager);
                            const foundItem = searchData.find(
                              (pre) => pre?.user?.id === item?.user?.id
                            );
                            if (foundItem) {
                              const newIdsArray = foundItem?.user?.staffs?.map(
                                (preps) => preps?.id
                              );
                              console.log("newIdsArray", newIdsArray)
                              setTaskList(newIdsArray);
                            }
                            setManagerUpdate(item.user);
                          }}
                        />
                      )}
                      <ButtonComponent
                        type={"button"}
                        textButton={"Vô hiệu hóa"}
                        style={
                          "text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white"
                        }
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
                        style={
                          "text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white"
                        }
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
      {showRoleById && <DetailAccountModal setShowRoleById={setShowRoleById} />}
      {showEditAccount && <EditAccountModal setEditAccount={setEditAccount} />}
      {showCreateAccount && (
        <CreateAccountModal setShowCreateAccount={setShowCreateAccount} />
      )}
      <div className="mt-10">
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
      </div>
      {/* update phân quyền */}
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenManager ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="add-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl m-auto px-4 md:h-auto">
          <div
            className="relative bg-white rounded-lg"
            style={{
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Cập nhật quản lý nhân viên</h3>
              <button
                type="button"
                onClick={() => setIsHiddenManager(true)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="add-user-modal"
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
                  <div className="col-span-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="">
                        <span className="text-xs font-medium">
                          Danh sách nhân viên
                        </span>
                        <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                          <ul>
                            {allAccount?.map((item, key) => (
                              <>
                                {item?.role?.roleName !== "ROLE_ADMIN" && managerUpdate.id !== item?.user?.id && item?.user?.id && (
                                  <li className="hover:bg-gray-100" key={key}>
                                    <button
                                      className="w-full text-start text-xs p-1"
                                      onClick={() =>
                                        handleAddTaskList(item?.user?.id)
                                      }
                                      type="button"
                                    >
                                      {item?.user?.email}
                                    </button>
                                  </li>
                                )}
                              </>
                            ))}
                          </ul>
                        </div>
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
                      </div>
                      <div className="">
                        <span className="text-xs font-medium">Danh sách nhân viên quản lý</span>
                        <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                          <ul>
                            {allUser?.map((pre, key) =>
                              taskList?.map((item) =>
                                pre?.id === item ? (
                                  <li
                                    className="text-xs p-1 flex justify-between py-1.5"
                                    key={key}
                                  >
                                    {pre?.email}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteManager(pre?.id)
                                      }
                                    >
                                      X
                                    </button>
                                  </li>
                                ) : (
                                  <li></li>
                                )
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <ButtonComponent
                    type={"button"}
                    textButton={"Lưu"}
                    style={
                      "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5 text-white"
                    }

                    handleClick={handleUpdateManager}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ManagerAccount;
