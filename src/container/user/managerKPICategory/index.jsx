
import { debounce } from "../../../app/debounce";
import SearchComponent from "../../component/SearchComponent";
import { Spinner } from "../../component/Spinner";
import Layout from "../../layout";
import TableComponent from "../../component/TableComponent";
import ButtonComponent from "../../component/ButtonComponent";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteKPICategories, getAllKPICategories, getKpiCategoriesById, searchKPICategoriesAsync } from "../../../thunks/KPICategoriesSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import CreateKPICateModal from "../../modal/kpi/kpiCategories/CreateKPICateModal";
import UpdateKPICateModal from "../../modal/kpi/kpiCategories/UpdateKPICateModal";


function ManagerKPICategories() {
  const { allKPICategories , paginationKPICategories } = useSelector(
    (state) => state.kpiCategoriesReducer
  );
  const dispatch = useDispatch();
//   const [showPermissionById, setShowPermissionById] = useState(false);
  const [currentPage, setCurrentPage] = useState(paginationKPICategories?.number + 1);
  const [isHiddenCreate, setIsHiddenCreate] = useState(false);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(false);

  useLayoutEffect(() => {
    if (allKPICategories?.length <= 0) {
      dispatch(getAllKPICategories());
    }
  }, []);
  useLayoutEffect(() => {
    dispatch(getAllKPICategories(0));
  }, []);


  const handleSearchKPICate = (e) => {
    dispatch(searchKPICategoriesAsync(e.target.value));
  };

  useEffect(() => {
    setCurrentPage(paginationKPICategories?.number + 1);
  }, [allKPICategories]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllKPICategories(pageNumber - 1));
  };

  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };
  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    dispatch(getKpiCategoriesById(item))
  };

  return (
    <Layout>
      <div className="p-4 px-10">
        <div className="title pt-3">
          <span className="text-xl font-bold uppercase">
            Danh sách danh mục KPI
          </span>
        </div>
        <div className="flex justify-between">
          <SearchComponent
            placeholder="Nhập tên danh mục KPI"
            handleSearch={debounce(handleSearchKPICate, 1000)}
            SearchingAnimate={
              <Spinner width={"w-5"} height={"h-5"} color={"fill-gray-400"} />
            }
            style={"w-2/6"}
          />
          <div>
          <ButtonComponent
          handleClick={handleHiddenCreate}
          textButton={"Thêm danh mục kpi"}
          style={"text-sky-500 bg-white border border-sky-500 hover:bg-[#B0E2FF] focus:ring-4 focus:ring-blue-300 px-5 "}
          />
          </div>
        </div>
        <div className="table-manager">
          <TableComponent
            headTable={["id", "Tên danh mục kpi", "hành động"]}
          >
            {allKPICategories?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className=" text-sm font-medium text-gray-500 whitespace-nowrap">
                    {key +1}
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 white space-nowrap text-start">
                  <button
                    className="w-full text-start"
                    // onClick={() => handleGetPermissionById(item?.id)}
                  >
                    {item?.name}
                  </button>
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <ButtonComponent
                    type={"button"}
                    textButton={"Chỉnh sửa"}
                    style={"text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white"}
                    handleClick={() => handleHiddenUpdate(item.id)}
                  />

                  <ButtonComponent
                    type={"button"}
                    textButton={"Xóa"}
                    style={"text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white"}
                    handleClick={() => {
                      if (
                        window.confirm("Bạn có muốn xóa danh mục này không?")
                      ) {
                        dispatch(deleteKPICategories(item.id));
                      }
                    }}
                  />
                </td>
              </tr>
            ))}{" "}
          </TableComponent>
        </div>
      </div>
      {isHiddenCreate && <CreateKPICateModal handleHiddenCreate={handleHiddenCreate} />}
      {isHiddenUpdate && <UpdateKPICateModal handleHiddenUpdate={handleHiddenUpdate} />}
      
      <div className="mt-10">
     {paginationKPICategories?.totalPages > 1 && (
      <Stack
        spacing={2}
        justifyContent="center"
        color="#fff"
        className="pagination"
      >
        <Pagination
          count={paginationKPICategories?.totalPages}
          color="primary"
          className="pagination-item"
          style={{ margin: "auto" }}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
     )}

      </div>
      
    </Layout>
  );
}

export default ManagerKPICategories;
