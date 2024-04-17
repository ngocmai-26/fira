import ButtonComponent from "../../component/ButtonComponent";
import Layout from "../../layout";
import SearchComponent from "../../component/SearchComponent";
import TableComponent from "../../component/TableComponent";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  deletePermissions,
  getAllPermissions,
  getPerById,
  searchPermissionAsync,
  updatePermission,
} from "../../../thunks/PermissionsThunk";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { debounce } from "../../../app/debounce";
import { Spinner } from "../../component/Spinner";
import { Pagination, Stack } from "@mui/material";

function ManagerPermissions() {
  const { allPermission, singlePermission, paginationPer } = useSelector(
    (state) => state.permissionsReducer
  );
  const dispatch = useDispatch();
  const [showPermissionById, setShowPermissionById] = useState(false);
  const [currentPage, setCurrentPage] = useState(paginationPer?.number + 1);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const [permDetail, setPermDetail] = useState({});

  useLayoutEffect(() => {
    if (allPermission?.length <= 0) {
      dispatch(getAllPermissions());
    }
  }, []);
  useLayoutEffect(() => {
    dispatch(getAllPermissions(0));
  }, []);

  const handleGetPermissionById = (item) => {
    setShowPermissionById(!showPermissionById);
    dispatch(getPerById(item));
  };

  const handleSearchContact = (e) => {
    dispatch(searchPermissionAsync(e.target.value));
  };

  useEffect(() => {
    setCurrentPage(paginationPer?.number + 1);
  }, [allPermission]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllPermissions(pageNumber - 1));
  };

  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setPermDetail(item);
  };
  const handleUpdate = () => {
    dispatch(
      updatePermission({
        id: permDetail?.id,
        data: { description: permDetail?.description },
      })
    );
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="title pt-3">
          <span className="text-xl font-bold uppercase">
            Danh sách chức năng
          </span>
        </div>
        <div className="flex justify-between">
          <SearchComponent
            placeholder="Nhập tên chức năng"
            handleSearch={debounce(handleSearchContact, 1000)}
            SearchingAnimate={
              <Spinner width={"w-5"} height={"h-5"} color={"fill-gray-400"} />
            }
            style={"w-2/6"}
          />
          <Link
            to="/them-chuc-nang"
            className="text-white bg-blue-700 hover:bg-blue-800 my-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  "
          >
            Thêm chức năng
          </Link>
        </div>
        <div className="table-manager">
          <TableComponent
            headTable={["id", "Tên chức năng", "Mô tả", "hành động"]}
          >
            {allPermission?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {item?.id}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  <button
                    className="w-full"
                    onClick={() => handleGetPermissionById(item?.id)}
                  >
                    {item?.name}
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
                        window.confirm("Bạn có muốn xóa chức năng này không?")
                      ) {
                        dispatch(deletePermissions(item.id));
                      }
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
          showPermissionById ? "block" : "hidden"
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
                onClick={() => setShowPermissionById(false)}
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
                      value={singlePermission?.name}
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
                      value={singlePermission?.description}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* update */}
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenUpdate ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="edit-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold ">Chỉnh sửa chức năng</h3>
              <button
                type="button"
                onClick={() => handleHiddenUpdate()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="edit-user-modal"
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
                      Tên chức năng
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      defaultValue={permDetail?.name}
                      id="full-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
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
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      onChange={(e) =>
                        setPermDetail({
                          ...permDetail,
                          description: e.target.value,
                        })
                      }
                      defaultValue={permDetail?.description}
                    ></textarea>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <button
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Stack
        spacing={2}
        justifyContent="center"
        color="#fff"
        className="pagination"
      >
        <Pagination
          count={paginationPer?.totalPages}
          color="primary"
          className="pagination-item"
          style={{ margin: "auto" }}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </Layout>
  );
}

export default ManagerPermissions;
