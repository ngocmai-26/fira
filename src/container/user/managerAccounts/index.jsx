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

function ManagerAccount() {
  const { allAccount, paginationAccount } = useSelector(
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
                "text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5 "
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
                      />
                      <ButtonComponent
                        type={"button"}
                        textButton={"Chi tiết"}
                        style={"text-white bg-[#58AD69]"}
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
      {showRoleById && <DetailAccountModal setShowRoleById={setShowRoleById} />}
      {showEditAccount && <EditAccountModal setEditAccount={setEditAccount} />}
      {showCreateAccount && (
        <CreateAccountModal setShowCreateAccount={setShowCreateAccount} />
      )}
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
