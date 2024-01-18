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
            email:"abc@gmail.com",
            department: "CNTT",
        },
        {
            id: 2,
            name: "Mai",
            phone: "0247856874",
            email:"abc@gmail.com",
            department: "CNTT",
        },
        {
            id: 3,
            name: "Mai",
            phone: "0247856874",
            email:"abc@gmail.com",
            department: "CNTT",
        },
    ]
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
            <TableComponent headTable={["id", "Họ và tên","email", "số điện thoại","phòng ban" , "hành động"]} bodyTable={userList} />
        </div>
      </div>
    </Layout>
  );
}

export default ManagerAccount;
