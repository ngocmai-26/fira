import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { FormField } from "../../component/FormField";
import Layout from "../../layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPermission } from "../../../thunks/PermissionsThunk";

function AddNewPermission() {
  const [newPermissionData, setNewPermissionData] = useState({});
  const [errors, setError] = useState({ name: "", description: "" });

  const dispatch = useDispatch();

  const nav = useNavigate();
  const handleAddPermission = () => {
    dispatch(addNewPermission(newPermissionData)).then((resp) => {
      if (!resp?.error) {
        nav("/quan-ly-chuc-nang");
      }
    });
  };
  return (
    <Layout>
      <div className="p-4 FormAddNewAccount w-2/4 m-auto">
        <div className="title pt-3 text-center">
          <span className="text-xl font-bold uppercase">Thêm chức năng</span>
        </div>

        <div className="">
          <form action="" className="py-0 sm:py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="name py-5">
                <div className="">
                  <div className="">
                    <label htmlFor="name" className="font-medium text-sm">
                      Tên chức năng
                    </label>
                    <FormField
                      name={"name"}
                      values={newPermissionData}
                      id={"name"}
                      setValue={setNewPermissionData}
                      required={"required"}
                    />
                    <ErrorField errors={errors} field={"name"} />
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
                      Mô tả
                    </label>
                    <FormField
                      name={"description"}
                      values={newPermissionData}
                      id={"description"}
                      setValue={setNewPermissionData}
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
                handleClick={handleAddPermission}
                style={
                  "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5  mr-3 text-white"
                }
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddNewPermission;
