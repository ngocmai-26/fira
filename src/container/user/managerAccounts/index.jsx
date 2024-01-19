import { Link } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import SearchComponent from "../../component/SearchComponent";
import TableComponent from "../../component/TableComponent";
import Layout from "../../layout";

function ManagerAccount() {
  const userList = [
    {
      id: 1,
      name: "Mai",
      phone: "0247856874",
      email: "abc@gmail.com",
      department: "CNTT",
    },
    {
      id: 2,
      name: "Mai",
      phone: "0247856874",
      email: "abc@gmail.com",
      department: "CNTT",
    },
    {
      id: 3,
      name: "Mai",
      phone: "0247856874",
      email: "abc@gmail.com",
      department: "CNTT",
    },
  ];
  return (
    <Layout>
      <div className="p-4">
        <div className="title pt-3">
          <span className="text-xl font-bold uppercase">
            Danh sách tài khoản
          </span>
        </div>
        <div className="flex justify-between">
          <SearchComponent placeholder="Nhập tên tài khoản" style={"w-2/6"} />
          {/* <ButtonComponent
            type={"button"}
            textButton={"Thêm tài khoản"}
            style={
              "py-1 bg-blue-700 hover:bg-blue-800 my-2 focus:ring-4 focus:ring-blue-300"
            }
          /> */}
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
              "Họ và tên",
              "email",
              "số điện thoại",
              "phòng ban",
              "hành động",
            ]}
          >
            {userList?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {key + 1}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.name}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.email}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.phone}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  {item?.department}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  {/* <ButtonComponent
                type="button"
                id="updateaccountButton"
                className="bg-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                
                Chỉnh sửa
              </ButtonComponent> */}
                  <ButtonComponent type={"button"} textButton={"Chỉnh sửa"} />

                  <ButtonComponent
                    type={"button"}
                    textButton={"Vô hiệu hóa"}
                    typeButton={2}
                  />
                </td>
              </tr>
            ))}
          </TableComponent>
        </div>
      </div>
    </Layout>
  );
}

export default ManagerAccount;