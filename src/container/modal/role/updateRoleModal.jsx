import { useState } from "react";
import { updateRole } from "../../../thunks/RolesThunk";

import { useDispatch, useSelector } from "react-redux";

function UpdateRoleModal({handleHiddenUpdate, roleDetail, setRoleDetail}) {
    
  
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      updateRole({
        id: roleDetail?.id,
        data: { description: roleDetail?.description },
      })
    );
  };
    return ( 
        <div
          className={`fixed left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
          id="edit-user-modal"
        >
          <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold ">Chỉnh sửa kpi</h3>
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
                        Tên chức vụ
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        // onChange={(e) => setUpdateRoleName(e.target.value)}
                        defaultValue={roleDetail?.roleName}
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
                          setRoleDetail({
                            ...roleDetail,
                            description: e.target.value,
                          })
                        }
                        defaultValue={roleDetail?.description}
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
     );
}

export default UpdateRoleModal;