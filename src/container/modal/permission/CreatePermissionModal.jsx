import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { FormField } from "../../component/FormField";
import Layout from "../../layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPermission } from "../../../thunks/PermissionsThunk";

function CreatePermissionModal({setShowCreatePermission}) {
  const [newPermissionData, setNewPermissionData] = useState({});
  const [errors, setError] = useState({ name: "", description: "" });

  const dispatch = useDispatch();

  const nav = useNavigate();
  const handleAddPermission = () => {
    dispatch(addNewPermission(newPermissionData)).then((resp) => {
      if (!resp?.error) {
        setShowCreatePermission(false)
      }
    });
  };
  return (
    <div
      className={`fixed mx-auto left-0 right-0 z-50 items-center justify-center  overflow-x-hidden overflow-y-auto mt-20 md:inset-0 h-modal sm:h-full`}
      id="edit-user-modal"
    >
      <div className="relative w-full h-full max-w-xl px-4 md:h-auto m-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold ">Thêm tài khoản</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="edit-user-modal"
              onClick={() => setShowCreatePermission(false)}
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
          <div className="px-6 ">
          <form action="" className="py-0 sm:py-4">
            <div className="">
              <div className="name py-2">
                <div className="">
                  <div className="">
                    <label htmlFor="name" className="font-medium text-sm">
                      Tên chức năng:
                      <span className="text-red-500">*</span>
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
              <div className="description py-2">
                <div className=" ">
                  <div className="relative">
                    <label
                      htmlFor="description"
                      className="font-medium text-sm"
                    >
                      Mô tả:
                      <span className="text-red-500">*</span>
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
    </div>
    </div>
  );
}

export default CreatePermissionModal;
