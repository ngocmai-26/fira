import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { FormField } from "../../component/FormField";
import Layout from "../../layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewRole } from "../../../thunks/RolesThunk";

function AddNewRole() {
  const [newRoleData, setNewRoleData] = useState({
    permissionIds: [],
    roleName: "",
    description: "",
  });
  const [errors, setError] = useState({ roleName: "", description: "" });
  const dispatch = useDispatch();

  const nav = useNavigate();
  const handleAddRole = () => {
    if (!newRoleData.roleName.trim() || !newRoleData.description.trim()) {
      setError({
        roleName: newRoleData.roleName.trim()
          ? ""
          : "Vui lòng nhập tên chức vụ",
        description: newRoleData.description.trim()
          ? ""
          : "Vui lòng nhập mô tả",
      });
      return;
    }
    dispatch(addNewRole(newRoleData)).then((resp) => {
      if (!resp?.error) {
        nav("/quan-ly-chuc-vu");
      }
    });
  };

  return (
    <Layout>
      <div className="p-4 FormAddNewAccount w-2/4 m-auto">
        <div className="title pt-3 text-center">
          <span className="text-xl font-bold uppercase">Thêm chức vụ</span>
        </div>

        <div className="">
          <form action="" className="py-0 sm:py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="roleName py-5">
                <div className="">
                  <div className="">
                    <label htmlFor="roleName" className="font-medium text-sm">
                      Tên chức vụ
                    </label>
                    <FormField
                      name={"roleName"}
                      values={newRoleData}
                      id={"roleName"}
                      setValue={setNewRoleData}
                      required={"required"}
                    />
                    <ErrorField errors={errors} field={"roleName"} />
                  </div>
                </div>
              </div>
              <div className="description py-5">
                <div className=" ">
                  <div className="relative">
                    <label
                      htmlFor="description"
                      className="font-medium text-sm"
                    >
                      description
                    </label>
                    <FormField
                      name={"description"}
                      values={newRoleData}
                      id={"description"}
                      setValue={setNewRoleData}
                      required={"required"}
                    />
                    <ErrorField errors={errors} field={"description"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-3 flex justify-end">
              <Link
                to="/quan-ly-chuc-vu"
                className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2"
              >
                Quay lại
              </Link>

              <ButtonComponent
                type={"button"}
                textButton={"Hoàn thành"}
                style={
                  "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5  mr-3 text-white"
                }
                handleClick={handleAddRole}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddNewRole;
