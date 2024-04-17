import { Link } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { FormField } from "../../component/FormField";
import Layout from "../../layout";
import SearchComponent from "../../component/SearchComponent";
import TableComponent from "../../component/TableComponent";
import { useEffect, useLayoutEffect, useState } from "react";
import ToastComponent from "../../component/ToastComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoles,
  getAllRole,
  getRoleById,
  removePermission,
  searchRolesAsync,
  updatePermission,
  updateRole,
} from "../../../thunks/RolesThunk";
import { getAllPermissions } from "../../../thunks/PermissionsThunk";
import { Spinner } from "../../component/Spinner";
import { debounce } from "../../../app/debounce";
import { setSearchContent } from "../../../slices/SearchSlice";
import { Pagination, Stack } from "@mui/material";
import UpdateRoleModal from "../../modal/role/updateRoleModal";

function ManagerRoles() {
  const { allRole, singleRole, paginationRole } = useSelector(
    (state) => state.rolesReducer
  );
  const { allPermission } = useSelector((state) => state.permissionsReducer);
  const [showRoleById, setShowRoleById] = useState(false);
  const [isHiddenPer, setIsHiddenPer] = useState(true);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [perUpdate, setPerUpdate] = useState({});
  const [currentPage, setCurrentPage] = useState(paginationRole?.number + 1);

  const [roleDetail, setRoleDetail] = useState({});
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (allRole.length <= 0) {
      dispatch(getAllRole());
    }
    if (allPermission.length <= 0) {
      dispatch(getAllPermissions());
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(getAllRole(0));
  }, []);

  const handleGetRoleById = (item) => {
    setShowRoleById(!showRoleById);
    dispatch(getRoleById(item));
  };

  const handleUpdatePer = () => {
    dispatch(updatePermission({ id: perUpdate.id, list: { ids: taskList } }));
  };
  const handleDeletePer = (item) => {
    dispatch(removePermission({ id: perUpdate.id, list: { ids: [item] } }));
    const newTaskList = taskList.filter((e) => e !== item);
    setTaskList(newTaskList);
  };

  const handleAddTaskList = (item) => {
    if (!taskList.includes(item)) {
      setTaskList([...taskList, item]);
    }
  };

  const handleSearchContact = (e) => {
    dispatch(searchRolesAsync(e.target.value));
  };


  useEffect(() => {
    setCurrentPage(paginationRole?.number + 1);
  }, [allRole]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllRole(pageNumber - 1));
  };

  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setRoleDetail(item);
  };


  return (
    <>
      <Layout>
        <div className="p-4">
          <div className="title pt-3">
            <span className="text-xl font-bold uppercase">
              Danh sách chức vụ
            </span>
          </div>
          <div className="flex justify-between">
            <SearchComponent
              placeholder="Nhập tên chức vụ"
              handleSearch={debounce(handleSearchContact, 1000)}
              SearchingAnimate={
                <Spinner width={"w-5"} height={"h-5"} color={"fill-gray-400"} />
              }
              style={"w-2/6"}
            />

            <Link
              to="/them-chuc-vu"
              className="text-white bg-blue-700 hover:bg-blue-800 my-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  "
            >
              Thêm chức vụ
            </Link>
          </div>
          <div className="table-manager">
            <TableComponent
              headTable={["id", "Tên chức vụ", "Mô tả", "hành động"]}
            >
              {allRole?.map((item, key) => (
                <tr className="hover:bg-gray-100" key={key}>
                  <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                    <div className="text-base font-semibold text-gray-900">
                      {key + 1}
                    </div>
                  </td>
                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                    <button
                      className="w-full"
                      onClick={() => handleGetRoleById(item?.id)}
                    >
                      {item?.roleName}
                    </button>
                  </td>
                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                    {item?.description}
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <ButtonComponent
                      type={"button"}
                      textButton={"Chỉnh sửa"}
                      handleClick={() => handleHiddenUpdate(item)}
                    />

                    <ButtonComponent
                      type={"button"}
                      textButton={"Xóa"}
                      typeButton={2}
                      handleClick={() => {
                        if (
                          window.confirm("Bạn có muốn xóa chức vụ này không?")
                        ) {
                          dispatch(deleteRoles(item.id));
                        }
                      }}
                    />
                    <ButtonComponent
                      type={"button"}
                      textButton={"Cấp quyền"}
                      typeButton={1}
                      handleClick={() => {
                        setIsHiddenPer(!isHiddenPer);
                        const foundItem = allRole.find(
                          (pre) => pre?.id === item?.id
                        );
                        if (foundItem) {
                          const newIdsArray = foundItem.permissions.map(
                            (perItem) => perItem?.id
                          );
                          setTaskList(newIdsArray);
                        }
                        setPerUpdate(item);
                      }}
                    />
                  </td>
                </tr>
              ))}{" "}
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
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Tên chức vụ
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="full-name"
                        disabled
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        value={singleRole?.roleName}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="biography"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Mô tả
                      </label>
                      <textarea
                        id="biography"
                        rows="4"
                        disabled
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        value={singleRole?.description}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* update phân quyền */}
        <div
          className={`fixed left-0 right-0 z-50 items-center justify-center ${
            isHiddenPer ? "hidden" : "flex"
          } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
          id="add-user-modal"
        >
          <div className="relative w-full h-full max-w-2xl m-auto px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold">Cấp quyền chức vụ</h3>
                <button
                  type="button"
                  onClick={() => setIsHiddenPer(true)}
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
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Tên chức vụ
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        value={perUpdate?.roleName}
                        disabled
                        id="full-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="col-span-6">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="">
                          <span className="text-xs font-medium">
                            Lựa chọn quyền
                          </span>
                          <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                            <ul>
                              {allPermission?.map((item, key) => (
                                <li className="hover:bg-gray-100" key={key}>
                                  <button
                                    className="w-full text-start text-xs p-1"
                                    onClick={() => handleAddTaskList(item.id)}
                                    type="button"
                                  >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="">
                          <span className="text-xs font-medium">Quyền hạn</span>
                          <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                            <ul>
                              {allPermission?.map((pre, key) =>
                                taskList?.map((item) =>
                                  pre.id === item ? (
                                    <li
                                      className="text-xs p-1 flex justify-between py-1.5"
                                      key={key}
                                    >
                                      {pre.name}
                                      <button
                                        type="button"
                                        onClick={() => handleDeletePer(pre.id)}
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
                    <button
                      className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="button"
                      onClick={handleUpdatePer}
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* update */}
        {isHiddenUpdate && <UpdateRoleModal handleHiddenUpdate={handleHiddenUpdate} roleDetail={roleDetail} setRoleDetail={setRoleDetail} />}

        <Stack
          spacing={2}
          justifyContent="center"
          color="#fff"
          className="pagination"
        >
          <Pagination
            count={paginationRole?.totalPages}
            color="primary"
            className="pagination-item"
            style={{ margin: "auto" }}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </Layout>
    </>
  );
}

export default ManagerRoles;
