import { Link } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { FormField } from "../../component/FormField";
import Layout from "../../layout";
import SearchComponent from "../../component/SearchComponent";
import TableComponent from "../../component/TableComponent";
import { useState } from "react";
import ToastComponent from "../../component/ToastComponent";

function ManagerRoles() {
  const roleList = [
    {
      id: 1,
      roleName: "Giang vien",
      description: "",
    },
    {
      id: 2,
      name: "Mai",
      roleName: "Giang vien 2",
      description: "",
    },
    {
      id: 3,
      name: "Mai",
      roleName: "Giang vien 3",
      description: "",
    },
  ];
  return (
  <>
    <Layout>
      <ToastComponent isHidden={true} title={"Xóa chức vụ"} content={"Bạn có muốn xóa chức vụ này không?"} buttonContent={[{buttonName: "Xóa", buttonStyle: "bg-red-500"}, {buttonName: "Hủy", buttonStyle: "bg-gray-500"}]} />
      <div className="p-4">
        <div className="title pt-3">
          <span className="text-xl font-bold uppercase">
            Danh sách tài khoản
          </span>
        </div>
        <div className="flex justify-between">
          <SearchComponent placeholder="Nhập tên tài khoản" style={"w-2/6"} />

          <Link
            to="/them-chuc-vu"
            className="text-white bg-blue-700 hover:bg-blue-800 my-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2  "
          >
            Thêm tài khoản
          </Link>
        </div>
        <div className="table-manager">
          <TableComponent
            headTable={["id", "Tên chức vụ", "Mô tả", "hành động"]}
          >
            {roleList?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {key + 1}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.roleName}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.description}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <ButtonComponent type={"button"} textButton={"Chỉnh sửa"} />

                  <ButtonComponent
                    type={"button"}
                    textButton={"Xóa"}
                    typeButton={2}
                  />
                  <ButtonComponent
                    type={"button"}
                    textButton={"Cấp quyền"}
                    typeButton={1}
                  />
                </td>
              </tr>
            ))}{" "}
          </TableComponent>
        </div>
      </div>
    </Layout>
   </>
  );
}

export default ManagerRoles;
