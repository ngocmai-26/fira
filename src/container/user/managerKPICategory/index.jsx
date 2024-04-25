import { Link } from "react-router-dom";
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
  const [permDetail, setPermDetail] = useState({});

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

  console.log("currentPage", currentPage)
  return (
    <Layout>
      <div className="p-4">
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
          <ButtonComponent
          handleClick={handleHiddenCreate}
          textButton={"Thêm danh mục kpi"}
          style="text-white bg-blue-700 hover:bg-blue-800 my-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  "
          />
        </div>
        <div className="table-manager">
          <TableComponent
            headTable={["id", "Tên danh mục kpi", "hành động"]}
          >
            {allKPICategories?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {key +1}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap text-start">
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
                    handleClick={() => handleHiddenUpdate(item.id)}
                  />

                  <ButtonComponent
                    type={"button"}
                    textButton={"Xóa"}
                    typeButton={2}
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
      
    </Layout>
  );
}

export default ManagerKPICategories;
